import type { GridSize, GroupedImages } from "../../types";

type CreateGridBodyResult = {
  grid: (string | null)[][];
  rowWords: Set<string>[];
  colWords: Set<string>[];
  wordCounts: Record<string, number>;
};

type OccurrencesMap = Record<string, number>;
type WordsCount = Record<string, number>;

type BuildResultParams = {
  grid: (string | null)[][];
  gridSize: GridSize;
  words: string[];
  groupedImages: GroupedImages;
  neededPerWord: WordsCount;
};

type CanPlaceWordParams = WordOperationParams & {
  gridSize: GridSize;
  occurrencesMap: OccurrencesMap;
  enforceRowColumnConstraints: boolean;
};

type GetPatternGridParams = {
  cellIndex: number;
  grid: (string | null)[][];
  gridSize: GridSize;
  words: string[];
  totalCells: number;
  occurrencesMap: OccurrencesMap;
  wordCounts: WordsCount;
  rowWords: Set<string>[];
  colWords: Set<string>[];
  enforceRowColumnConstraints: boolean;
};

type WordOperationParams = {
  word: string;
  row: number;
  col: number;
  grid: (string | null)[][];
  rowWords: Set<string>[];
  colWords: Set<string>[];
  wordCounts: WordsCount;
};

export type {
  BuildResultParams,
  CanPlaceWordParams,
  CreateGridBodyResult,
  GetPatternGridParams,
  OccurrencesMap,
  WordOperationParams,
  WordsCount,
};
