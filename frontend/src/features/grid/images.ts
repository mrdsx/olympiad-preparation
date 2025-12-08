import imagesData from "./data/images.json";

type ImageItem = {
  name: string;
  category: string;
  publicId: string;
};

type ImagesEntry = {
  applyGrayscale: boolean;
  gridFlow: "row" | "column";
  columns: number;
  rows: number;
  images: ImageItem[];
};

// TODO: add category attribute to all images
function getImagesObject(): Record<string, ImagesEntry> {
  return imagesData;
}

function getImagesById(id: string): ImagesEntry | null {
  return getImagesObject()[id] ?? null;
}

export { getImagesById, getImagesObject, type ImagesEntry, type ImageItem };
