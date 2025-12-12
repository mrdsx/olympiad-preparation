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

function getImagesObject(): Record<string, ImagesEntry> {
  // @ts-ignore
  // TODO: add zod validation
  return structuredClone(imagesData);
}

function getImagesById(id: string): ImagesEntry | null {
  return getImagesObject()[id] ?? null;
}

export { getImagesById, getImagesObject, type ImageItem, type ImagesEntry };
