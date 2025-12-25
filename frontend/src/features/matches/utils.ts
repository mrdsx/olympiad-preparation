import { GRADES_2_4, GRADES_5_11 } from "@/lib/constants";
import { getRandomInt } from "@/lib/utils";

import { ImagesGeneratorFabric } from "./entities/imagesGenerator/imagesGeneratorFabric";
import { type ImagesEntry, getImagesObject } from "./images";
import type {
  GeneratedImagesResult,
  GridSize,
  GroupedImages,
  ImageItem,
  SchoolGrade,
} from "./types";

const imagesObject = getImagesObject();

function buildImages(categoryArrays: ImageItem[][]): ImageItem[] {
  const result: ImageItem[] = [];
  const chunkSize = Math.min(...categoryArrays.map((items) => items.length));

  categoryArrays
    .sort((a, b) => b.length - a.length)
    .forEach((items) => {
      for (let i = 0; i < items.length; i += chunkSize) {
        const chunk = items.slice(i, i + chunkSize);
        result.push(...chunk);
      }
    });

  return result;
}

function generateImages(
  images: ImageItem[],
  imagesLength: number,
): ImageItem[] {
  const result = [];
  const imagesPool = structuredClone(images);

  for (let i = 0; i < imagesLength; i++) {
    const randomIndex = getRandomInt(0, imagesPool.length - 1);
    result.push(imagesPool[randomIndex]);
    imagesPool.splice(randomIndex, 1);
  }

  return result;
}

function groupImagesByCategory(images: ImageItem[]): GroupedImages {
  const groupedImages = Object.groupBy(images, ({ category }) => category);
  const categoryArrays = Object.values(groupedImages);
  if (categoryArrays.length === 0) {
    throw new Error("Length of categoryArrays must be greater than 0");
  }

  return groupedImages as GroupedImages;
}

function handleImagesGeneration(
  gridSize: GridSize,
  schoolGrade: SchoolGrade,
  isFinalOlympiadStage: boolean,
): GeneratedImagesResult {
  if (!isFinalOlympiadStage && GRADES_2_4.includes(schoolGrade)) {
    schoolGrade = "2_4";
  } else if (!isFinalOlympiadStage && GRADES_5_11.includes(schoolGrade)) {
    schoolGrade = "5_11";
  }

  const { images } = structuredClone(imagesObject[schoolGrade]);
  const generatorFabric = new ImagesGeneratorFabric();
  const generator = generatorFabric.create(gridSize, schoolGrade, images);
  let randomImages;

  try {
    randomImages = generator.generate();
  } catch {
    const imagesLength = gridSize.columns * gridSize.rows;
    randomImages = generateImages(images, imagesLength);
    console.warn("fallback to simple generation");
  }

  return {
    applyGrayscale: imagesObject[schoolGrade].applyGrayscale,
    images: randomImages,
  };
}

function processImages({ images, columns, rows }: ImagesEntry): ImageItem[] {
  const categories = groupImagesByCategory(images);
  const imagesArray = buildImages(Object.values(categories));
  if (imagesArray.length !== columns * rows) {
    throw new Error(
      `Images length (${imagesArray.length}) differs from cells number (${columns * rows}).`,
    );
  }

  return imagesArray;
}

export { groupImagesByCategory, handleImagesGeneration, processImages };
