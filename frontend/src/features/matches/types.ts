type GeneratedImagesResult = { applyGrayscale: boolean; images: ImageItem[] };
type GroupedImages = Record<string, ImageItem[]>;

type ImageItem = {
  name: string;
  category: string;
  publicId: string;
};

type RebusItem = {
  name: string;
  category: string;
  publicId: string;
};

type SchoolGrade = "2" | "2_4" | "3_4" | "5_6" | "5_11" | "7_11";
type StringGridLayout = "3x4" | "4x4" | "4x6" | "5x6";

type GridSize = {
  columns: number;
  rows: number;
  string: StringGridLayout;
};

export type {
  GeneratedImagesResult,
  GridSize,
  GroupedImages,
  ImageItem,
  RebusItem,
  SchoolGrade,
  StringGridLayout,
};
