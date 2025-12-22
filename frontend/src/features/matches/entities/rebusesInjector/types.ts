type ValidGrid = string[][];

type ColumnStats = {
  columnIndex: number;
  duplicateCellCount: number;
  duplicateCells: [number, number][];
};

type HasDiagonalParams = {
  row: number;
  column: number;
  grid: ValidGrid;
};

type PlaceRebusParams = {
  grid: ValidGrid;
  targetColumns: ColumnStats[];
  replacedGroups: Set<string>;
  rowHasRebus: boolean[];
  columnHasRebus: boolean[];
};

export type { ColumnStats, HasDiagonalParams, PlaceRebusParams, ValidGrid };
