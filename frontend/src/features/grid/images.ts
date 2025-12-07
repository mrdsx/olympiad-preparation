import imagesData from "./data/images.json";
import type { SchoolGrade } from "./types";

type ImageItem = {
  name: string;
  publicId: string;
};

type ImagesData = {
  [key in Exclude<SchoolGrade, "2">]: {
    applyGrayscale: boolean;
    images: ImageItem[];
  };
};

function getImages(): ImagesData {
  return imagesData;
}

export { getImages, type ImageItem };
