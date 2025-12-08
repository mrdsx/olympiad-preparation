import { GRADES_2_4, GRADES_5_11 } from "@/lib/constants";
import { getRandomInt } from "@/lib/utils";
import { getImagesObject, type ImageItem, type ImagesEntry } from "./images";
import type { SchoolGrade } from "./types";

const imagesObject = getImagesObject();

function generateImages(
  length: number,
  grade: SchoolGrade,
  isFinalOlympiadStage: boolean,
): [boolean, ImageItem[]] {
  if (!isFinalOlympiadStage && GRADES_2_4.includes(grade)) {
    grade = "2_4";
  } else if (!isFinalOlympiadStage && GRADES_5_11.includes(grade)) {
    grade = "5_11";
  }

  const images = [...imagesObject[grade].images];
  const randomImages = [];
  for (let i = 0; i < length; i++) {
    const randomIndex = getRandomInt(0, images.length - 1);
    randomImages.push(images[randomIndex]);
    images.splice(randomIndex, 1);
  }

  return [imagesObject[grade].applyGrayscale, randomImages];
}

function getImagesCategoryArrays(images: ImageItem[]): ImageItem[][] {
  const groupedImages = Object.groupBy(images, ({ category }) => category);
  const categoryArrays = Object.values(groupedImages) as ImageItem[][];
  if (categoryArrays.length === 0) {
    throw new Error("Length of categoryArrays must be greater than 0");
  }

  return categoryArrays;
}

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

function processImages(imagesEntry: ImagesEntry): ImageItem[] {
  const { images, columns, rows } = imagesEntry;
  const categoryArrays = getImagesCategoryArrays(images);
  const imagesArray = buildImages(categoryArrays);
  if (imagesArray.length !== columns * rows) {
    throw new Error(
      `Images length (${imagesArray.length}) differs from cells number (${columns * rows}).`,
    );
  }

  return imagesArray;
}

export { generateImages, processImages };
