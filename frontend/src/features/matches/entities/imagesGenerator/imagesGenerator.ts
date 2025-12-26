import { getRandomInt, objectValuesSum } from "@/lib/utils";

import { REBUS_CATEGORY } from "../../constants";
import type {
  GridSize,
  GroupedImages,
  ImageItem,
  RebusItem,
} from "../../types";
import { groupImagesByCategory } from "../../utils";
import { RebusesInjector } from "../rebusesInjector/rebusesInjector";
import type {
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
} from "./types";

const REGIONAL_STAGE_GRID_AREA = 16;
const MAX_SAME_WORDS_ALLOWED = 2;

interface ImagesGenerator {
  enforceColumnRowConstraints: boolean;
  enforceOnlyRowConstraints: boolean;
  colWords: ColWords;
  rowWords: RowWords;
  grid: Grid;
  words: string[];
  wordsCount: WordsCount;
}

class ImagesGenerator {
  readonly images: ImageItem[];
  readonly gridSize: GridSize;
  readonly rebuses: RebusItem[];
  readonly rebusesCount: number;
  readonly rebusesInjector: RebusesInjector;

  constructor(
    { images, gridSize, rebuses, rebusesCount }: ImagesGeneratorConfig,
    rebusesInjector: RebusesInjector,
  ) {
    this.images = images;
    this.gridSize = gridSize;
    this.rebuses = rebuses;
    this.rebusesCount = rebusesCount;
    this.rebusesInjector = rebusesInjector;
    this.enforceColumnRowConstraints = false;
    this.enforceOnlyRowConstraints = false;
    this.colWords = [];
    this.rowWords = [];
    this.grid = [];
    this.words = [];
    this.wordsCount = {};
  }

  public generate(): ImageItem[] {
    const groupedImages = groupImagesByCategory(this.images);
    const occurrencesMap = this.buildOccurrencesMap(groupedImages);
    const gridArea = this.gridSize.columns * this.gridSize.rows;
    this.words = Object.keys(occurrencesMap);
    this.validateGridSize(occurrencesMap);

    this.initGridConstraints(occurrencesMap);
    this.initGridBody();

    if (
      !this.getPatternGrid({
        cellIndex: 0,
        occurrencesMap,
      })
    ) {
      throw new Error(
        `Cannot fill ${this.gridSize.string} grid with given constraints`,
      );
    }

    if (gridArea > REGIONAL_STAGE_GRID_AREA) {
      this.grid = this.rebusesInjector.injectRebusCategory(
        this.grid,
        this.rebusesCount,
        this.enforceOnlyRowConstraints,
      );
    }
    const neededPerWord = this.countNeededPerWord();
    this.validateImageAvailability(neededPerWord, groupedImages);

    return this.buildResult({
      groupedImages,
      neededPerWord,
    });
  }

  private buildOccurrencesMap(groupedImages: GroupedImages): OccurrencesMap {
    const occurrencesPairs = Object.entries(groupedImages).map(
      ([group, groupImages]) => [group, groupImages.length],
    );
    return Object.fromEntries(occurrencesPairs) as OccurrencesMap;
  }

  private validateGridSize(occurrencesMap: OccurrencesMap): void {
    const gridArea = this.gridSize.rows * this.gridSize.columns;
    const totalMaxOccurrences = objectValuesSum(occurrencesMap);

    if (gridArea > totalMaxOccurrences) {
      throw new Error(
        `Grid size ${gridArea} exceeds total max occurrences ${totalMaxOccurrences}`,
      );
    }
  }

  private calculateMaxGridArea(occurrencesMap: OccurrencesMap): number {
    const words = Object.keys(occurrencesMap);
    const maxOccurrences = Object.values(occurrencesMap);
    const totalMaxOccurrences = objectValuesSum(occurrencesMap);
    const numDistinctWords = words.length;

    let maxArea = 0;
    let bestRows = 0;
    let bestColumns = 0;

    // Try all possible grid dimensions
    for (let rows = 1; rows <= totalMaxOccurrences; rows++) {
      for (let columns = 1; columns <= totalMaxOccurrences; columns++) {
        const area = rows * columns;
        if (area > totalMaxOccurrences) break;

        const minDimension = Math.min(rows, columns);
        if (numDistinctWords < minDimension) continue;

        // Calculate actual usable occurrences with row/column constraint
        const maxPerWord = minDimension;
        const actualUsable = maxOccurrences.reduce(
          (sum, max) => sum + Math.min(max, maxPerWord),
          0,
        );

        if (actualUsable >= area && area > maxArea) {
          maxArea = area;
          bestRows = rows;
          bestColumns = columns;
        }
      }
    }

    return bestRows * bestColumns;
  }

  private initGridBody(): void {
    this.grid = Array(this.gridSize.rows)
      .fill(null)
      .map(() => Array(this.gridSize.columns).fill(null));

    this.words.forEach((word) => {
      this.wordsCount[word] = 0;
    });

    this.colWords = Array(this.gridSize.columns)
      .fill(null)
      .map(() => new Set());
    this.rowWords = Array(this.gridSize.rows)
      .fill(null)
      .map(() => new Set());
  }

  private initGridConstraints(occurrencesMap: OccurrencesMap): void {
    const maxArea = this.calculateMaxGridArea(occurrencesMap);
    const currentArea = this.gridSize.rows * this.gridSize.columns;
    this.enforceColumnRowConstraints = maxArea >= currentArea;
    this.enforceOnlyRowConstraints =
      this.gridSize.columns <= this.words.length &&
      !this.enforceColumnRowConstraints;
  }

  private canPlaceWord({
    word,
    row,
    col,
    occurrencesMap,
  }: CanPlaceWordParams): boolean {
    if (this.wordsCount[word] >= occurrencesMap[word]) {
      return false;
    }

    const rowHasWord = this.rowWords[row].has(word);
    const colHasWord = this.colWords[col].has(word);

    if (this.enforceColumnRowConstraints && (colHasWord || rowHasWord)) {
      return false;
    } else if (this.enforceOnlyRowConstraints && rowHasWord) {
      return false;
    }

    let wordCount = 0;
    for (let row = 0; row < this.grid.length; row++) {
      if (this.grid[row][col] === word) {
        wordCount += 1;
      }
    }
    if (wordCount >= MAX_SAME_WORDS_ALLOWED) return false;

    // Check no touching horizontally/vertically (always enforced)
    const horizontalVerticalDirections = [
      [-1, 0], // up
      [1, 0], // down
      [0, -1], // left
      [0, 1], // right
    ];
    if (this.enforceOnlyRowConstraints) {
      horizontalVerticalDirections.push([-2, 0], [2, 0]); // [up, down]
    }

    const canTouchDiagonally = getRandomInt(1, 10) <= 3;

    for (const [
      verticalOffset,
      horizontalOffset,
    ] of horizontalVerticalDirections) {
      if ([-2, 2].includes(verticalOffset) && getRandomInt(1, 10) <= 5) {
        return this.areDiagonalsValid({
          row,
          col,
          word,
          canTouchDiagonally,
        });
      }
      const curRow = row + verticalOffset;
      const curCol = col + horizontalOffset;
      if (
        curRow >= 0 &&
        curRow < this.gridSize.rows &&
        curCol >= 0 &&
        curCol < this.gridSize.columns &&
        this.grid[curRow][curCol] === word
      ) {
        return false;
      }
    }

    return this.areDiagonalsValid({
      row,
      col,
      word,
      canTouchDiagonally,
    });
  }

  private placeWord({ word, row, col }: WordOperationParams): void {
    this.grid[row][col] = word;
    this.wordsCount[word]++;
    this.rowWords[row].add(word);
    this.colWords[col].add(word);
  }

  private removeWord({ word, row, col }: WordOperationParams): void {
    this.grid[row][col] = null;
    this.wordsCount[word]--;
    this.rowWords[row].delete(word);
    this.colWords[col].delete(word);
  }

  private getPatternGrid({
    cellIndex,
    occurrencesMap,
  }: GetPatternGridParams): boolean {
    const totalCells = this.gridSize.columns * this.gridSize.rows;
    if (cellIndex === totalCells) {
      return true;
    }

    const row = Math.floor(cellIndex / this.gridSize.columns);
    const col = cellIndex % this.gridSize.columns;

    const shuffledWords = [...this.words].sort(
      () => getRandomInt(1, 1000) - 500,
    );

    for (const word of shuffledWords) {
      if (
        this.canPlaceWord({
          word,
          row,
          col,
          occurrencesMap,
        })
      ) {
        this.placeWord({
          word,
          row,
          col,
        });

        if (
          this.getPatternGrid({
            cellIndex: cellIndex + 1,
            occurrencesMap,
          })
        ) {
          return true;
        }

        this.removeWord({
          word,
          row,
          col,
        });
      }
    }

    return false;
  }

  private countNeededPerWord(): WordsCount {
    const neededPerWord: WordsCount = {};
    for (const word of this.words) neededPerWord[word] = 0;
    for (let row = 0; row < this.gridSize.rows; row++) {
      for (let col = 0; col < this.gridSize.columns; col++) {
        const word = this.grid[row][col];
        if (!word) continue;
        neededPerWord[word] += 1;
      }
    }

    return neededPerWord;
  }

  private areDiagonalsValid({
    row,
    col,
    word,
    canTouchDiagonally,
  }: AreDiagonalsValidParams): boolean {
    const diagonalDirections = [
      [-1, -1], // top left
      [-1, 1], // top right
      [1, -1], // bottom left
      [1, 1], // bottom right
    ];

    for (const [dr, dc] of diagonalDirections) {
      const nr = row + dr;
      const nc = col + dc;
      if (
        nr >= 0 &&
        nr < this.gridSize.rows &&
        nc >= 0 &&
        nc < this.gridSize.columns &&
        this.grid[nr][nc] === word
      ) {
        if (!canTouchDiagonally) return false;

        // Block chains of 3 along the same diagonal
        const rr = nr + dr;
        const cc = nc + dc;

        if (
          rr >= 0 &&
          rr < this.gridSize.rows &&
          cc >= 0 &&
          cc < this.gridSize.columns &&
          this.grid[rr][cc] === word
        ) {
          return false;
        }

        // Block adjacent diagonal pairs in the same 2x2 window
        // 2x2 window corners: (row,col), (row,col+dc), (nr,nc), (nr,nc-dc)
        const adj1r = row;
        const adj1c = col + dc;
        const adj2r = nr;
        const adj2c = nc - dc;
        if (
          adj1c >= 0 &&
          adj1c < this.gridSize.columns &&
          adj2r >= 0 &&
          adj2r < this.gridSize.rows &&
          adj2c >= 0 &&
          adj2c < this.gridSize.columns &&
          this.grid[adj1r][adj1c] === word &&
          this.grid[adj2r][adj2c] === word
        ) {
          return false;
        }
      }
    }

    return true;
  }

  private validateImageAvailability(
    neededPerWord: WordsCount,
    groupedImages: GroupedImages,
  ): void {
    for (const word of Object.keys(neededPerWord)) {
      const available = groupedImages[word]?.length ?? 0;
      if (neededPerWord[word] > available) {
        throw new Error(
          `Not enough unique images for category "${word}": need ${neededPerWord[word]}, have ${available}`,
        );
      }
    }
  }

  private buildResult({
    groupedImages,
    neededPerWord,
  }: BuildResultParams): ImageItem[] {
    const rebusesPool = this.rebusesInjector.getRebuses(
      this.rebuses,
      this.rebusesCount,
    );
    groupedImages[REBUS_CATEGORY] = rebusesPool;

    const imagePools: Record<string, ImageItem[]> = {};
    for (const word of this.words) {
      imagePools[word] = structuredClone(groupedImages[word]);
    }
    imagePools[REBUS_CATEGORY] = rebusesPool;

    const result: ImageItem[] = [];
    for (let row = 0; row < this.gridSize.rows; row++) {
      for (let col = 0; col < this.gridSize.columns; col++) {
        const word = this.grid[row][col];
        if (!word) {
          throw new Error(`Empty cell at (${row}, ${col})`);
        }

        const categoryImages = groupedImages[word];
        if (!categoryImages || categoryImages.length === 0) {
          throw new Error(`No images found for category: ${word}`);
        }

        const pool = imagePools[word];
        if (!pool || pool.length === 0) {
          throw new Error(
            `Ran out of unique images for category: ${word}. Needed ${neededPerWord[word]}.`,
          );
        }
        const randomIndex = getRandomInt(0, pool.length - 1);
        const [picked] = pool.splice(randomIndex, 1);
        result.push(picked);
      }
    }

    return result;
  }
}

export { ImagesGenerator };
