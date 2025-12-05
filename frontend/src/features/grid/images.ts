import imagesData from "./data/images.json";
import type { SchoolGrade } from "./types";

type ImageItem = {
  name: string;
  publicId: string;
};

type ImagesData = Record<SchoolGrade, readonly ImageItem[]>;

function getImages(): ImagesData {
  return imagesData;
}

export { getImages, type ImageItem };
