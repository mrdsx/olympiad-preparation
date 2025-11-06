import { getRandomInt } from "@/lib/utils";
import { imagesArray, type ImageItem } from "./images";

function generateImages(length: number): ImageItem[] {
  const images = [...imagesArray];
  const randomImages = [];
  for (let i = 0; i < length; i++) {
    const randomIndex = getRandomInt(0, images.length - 1);
    randomImages.push(images[randomIndex]);
    images.splice(randomIndex, 1);
  }

  return randomImages;
}

export { generateImages };
