import { getRandomInt } from "@/lib/utils";
import { getImages, type ImageItem } from "./images";
import type { SchoolGrade } from "./types";

const imagesObject = getImages();

function generateImages(length: number, grade: SchoolGrade): ImageItem[] {
  const images = [...imagesObject[grade]];
  const randomImages = [];
  for (let i = 0; i < length; i++) {
    const randomIndex = getRandomInt(0, images.length - 1);
    randomImages.push(images[randomIndex]);
    images.splice(randomIndex, 1);
  }

  return randomImages;
}

export { generateImages };
