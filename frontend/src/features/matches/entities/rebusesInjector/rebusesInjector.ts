import { getRandomInt } from "@/lib/utils";

import { REBUS_CATEGORY } from "../../constants";
import type { RebusItem } from "../../types";
import type { Grid } from "../imagesGenerator/types";
import type {
  ColumnStats,
  HasDiagonalParams,
  PlaceRebusParams,
  ValidGrid,
} from "./types";

const SKIPPED_CELLS_THRESHOLD = 1000;

interface RebusesInjector {
  rowCount: number;
  columnCount: number;
}

class RebusesInjector {
  constructor() {
    this.rowCount = 0;
    this.columnCount = 0;
  }

  public injectRebusCategory(
    grid: Grid,
    rebusesCount: number,
    replaceDuplicates: boolean,
  ): ValidGrid {
    const validGrid = this.validateGrid(grid);

    this.rowCount = validGrid.length;
    this.columnCount = validGrid[0].length;
    const rowHasRebus = new Array(this.rowCount).fill(false);
    const columnHasRebus = new Array(this.columnCount).fill(false);
    const replacedGroups = new Set<string>();
    let rebusesPlaced = 0;
    let skipped = 0;

    if (!replaceDuplicates) {
      return this.randomlyInjectRebuses(
        validGrid,
        rebusesCount,
        rowHasRebus,
        columnHasRebus,
      );
    }

    const columnStats = this.collectColumnStats(validGrid);

    while (rebusesPlaced < rebusesCount && skipped < SKIPPED_CELLS_THRESHOLD) {
      const targetColumns = this.pickTopColumns(columnStats, rebusesCount);
      const rebusPlaced = this.placeRebus({
        grid: validGrid,
        targetColumns,
        replacedGroups,
        rowHasRebus,
        columnHasRebus,
      });
      if (rebusPlaced) {
        rebusesPlaced += 1;
        skipped = 0;
      } else {
        skipped += 1;
      }
    }

    if (rebusesPlaced < rebusesCount) {
      return this.injectRebusCategory(grid, rebusesCount, replaceDuplicates);
    }
    return validGrid;
  }

  public getRebuses(rebuses: RebusItem[], rebusesCount: number): RebusItem[] {
    const result: RebusItem[] = [];

    while (result.length < rebusesCount) {
      const rebusesPool = structuredClone(rebuses);
      const randomIndex = getRandomInt(0, rebusesPool.length - 1);
      const [randomRebus] = rebusesPool.splice(randomIndex, 1);

      const rebusItem = result.find((item) => item.name === randomRebus.name);
      const rebusAlreadyExists = rebusItem === undefined;
      if (rebusAlreadyExists) {
        result.push(randomRebus);
      }
    }

    return result;
  }

  private collectColumnStats(grid: ValidGrid): ColumnStats[] {
    const stats: ColumnStats[] = [];

    for (let col = 0; col < this.columnCount; col++) {
      const valueFrequency = new Map<string, number>();

      for (let row = 0; row < this.rowCount; row++) {
        const value = grid[row][col];
        valueFrequency.set(value, (valueFrequency.get(value) || 0) + 1);
      }

      const duplicateCells: [number, number][] = [];
      for (let row = 0; row < this.rowCount; row++) {
        const value = grid[row][col];
        if (valueFrequency.get(value)! > 1) {
          duplicateCells.push([row, col]);
        }
      }

      stats.push({
        columnIndex: col,
        duplicateCellCount: duplicateCells.length,
        duplicateCells,
      });
    }

    return stats;
  }

  private randomlyInjectRebuses(
    grid: ValidGrid,
    rebusesCount: number,
    rowHasRebus: boolean[],
    columnHasRebus: boolean[],
  ): ValidGrid {
    const resultGrid: ValidGrid = structuredClone(grid);
    let placedRebuses = 0;

    while (placedRebuses < rebusesCount) {
      const columnIndex = getRandomInt(0, this.columnCount - 1);
      const rowIndex = getRandomInt(0, this.rowCount - 1);
      if (
        !rowHasRebus[rowIndex] &&
        !columnHasRebus[columnIndex] &&
        !this.hasDiagonalRebus({
          row: rowIndex,
          column: columnIndex,
          grid: resultGrid,
        })
      ) {
        placedRebuses += 1;
        resultGrid[rowIndex][columnIndex] = REBUS_CATEGORY;
        rowHasRebus[rowIndex] = true;
        columnHasRebus[columnIndex] = true;
      }
    }

    return resultGrid;
  }

  private hasDiagonalRebus({ row, column, grid }: HasDiagonalParams): boolean {
    const diagonals = [
      [row - 1, column - 1],
      [row - 1, column + 1],
      [row + 1, column - 1],
      [row + 1, column + 1],
    ];

    for (const [r, c] of diagonals) {
      if (
        r >= 0 &&
        r < this.rowCount &&
        c >= 0 &&
        c < this.columnCount &&
        grid[r][c] === REBUS_CATEGORY
      ) {
        return true;
      }
    }
    return false;
  }

  /** Pick top columns with the most duplicates */
  private pickTopColumns(
    columnStats: ColumnStats[],
    rebusesCount: number,
  ): ColumnStats[] {
    return columnStats
      .sort(() => getRandomInt(1, 1000) - 500)
      .sort((a, b) => b.duplicateCellCount - a.duplicateCellCount)
      .slice(0, rebusesCount);
  }

  /** Place rebus in available cells */
  private placeRebus({
    grid,
    targetColumns,
    replacedGroups,
    rowHasRebus,
    columnHasRebus,
  }: PlaceRebusParams): boolean {
    for (const columnInfo of targetColumns) {
      const availableCells = columnInfo.duplicateCells.filter(
        ([row, column]) =>
          !rowHasRebus[row] &&
          !columnHasRebus[column] &&
          !replacedGroups.has(grid[row][column]) &&
          !this.hasDiagonalRebus({ row, column, grid }),
      );
      if (availableCells.length === 0) continue;

      const randomIndex = getRandomInt(0, availableCells.length - 1);
      const [chosenRow, chosenColumn] = availableCells[randomIndex];

      replacedGroups.add(grid[chosenRow][chosenColumn]);
      grid[chosenRow][chosenColumn] = REBUS_CATEGORY;
      rowHasRebus[chosenRow] = true;
      columnHasRebus[chosenColumn] = true;

      columnInfo.duplicateCellCount -= 1;
      const duplicateCellIndex = columnInfo.duplicateCells.indexOf(
        availableCells[randomIndex],
      );
      columnInfo.duplicateCells.splice(duplicateCellIndex, 1);

      return true;
    }

    return false;
  }

  /** Returns valid grid without nulls and 'ребус' strings */
  private validateGrid(grid: Grid): ValidGrid {
    const rowLength = grid[0].length;
    for (const row of grid) {
      if (row.length !== rowLength) {
        throw new Error("Invalid row sizes");
      }

      for (const cell of row) {
        if (cell === null || cell === REBUS_CATEGORY) {
          throw new Error(
            "Grid cells must contain only strings without rebuses",
          );
        }
      }
    }

    return structuredClone(grid) as ValidGrid;
  }
}

export { RebusesInjector };
