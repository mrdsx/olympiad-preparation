import { GRADES_2_4, GRADES_5_11 } from "@/lib/constants";
import { getRandomInt } from "@/lib/utils";
import { getImages, type ImageItem } from "./images";
import type { SchoolGrade } from "./types";

const imagesObject = getImages();

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

export { generateImages };
