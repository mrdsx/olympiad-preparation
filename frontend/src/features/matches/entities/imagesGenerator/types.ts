import type {
  GridSize,
  GroupedImages,
  ImageItem,
  RebusItem,
} from "@/features/matches";

type Grid = (string | null)[][];
type RowWords = Set<string>[];
type ColWords = Set<string>[];
type OccurrencesMap = Record<string, number>;
type WordsCount = Record<string, number>;

type AreDiagonalsValidParams = {
  row: number;
  col: number;
  word: string;
  canTouchDiagonally: boolean;
};

type BuildResultParams = {
  groupedImages: GroupedImages;
  neededPerWord: WordsCount;
};

type CanPlaceWordParams = WordOperationParams & {
  occurrencesMap: OccurrencesMap;
};

type GetPatternGridParams = {
  cellIndex: number;
  occurrencesMap: OccurrencesMap;
};

type ImagesGeneratorConfig = {
  images: ImageItem[];
  gridSize: GridSize;
  rebuses: RebusItem[];
  rebusesCount: number;
};

type WordOperationParams = {
  word: string;
  row: number;
  col: number;
};

export type {
  AreDiagonalsValidParams,
  BuildResultParams,
  CanPlaceWordParams,
  ColWords,
  GetPatternGridParams,
  Grid,
  ImagesGeneratorConfig,
  OccurrencesMap,
  RowWords,
  WordOperationParams,
  WordsCount,
};
