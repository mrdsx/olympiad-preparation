import imagesData from "./data/images.json";
import type { ImageItem } from "./types";

type ImagesEntry = {
  applyGrayscale: boolean;
  gridFlow: "row" | "column";
  columns: number;
  rows: number;
  images: ImageItem[];
};

function getImagesObject(): Record<string, ImagesEntry> {
  // @ts-expect-error typescript raises error because it infers gridFlow as string
  // TODO: add zod validation
  return structuredClone(imagesData);
}

function getImagesById(id: string): ImagesEntry | null {
  return getImagesObject()[id] ?? null;
}

export { getImagesById, getImagesObject, type ImagesEntry };
