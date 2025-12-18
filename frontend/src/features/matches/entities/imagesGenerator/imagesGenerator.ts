import { getRandomInt } from "@/lib/utils";

import type { ImageItem } from "../../images";
import type { GridSize, GroupedImages } from "../../types";
import { groupImagesByCategory } from "../../utils";
import type {
  BuildResultParams,
  CanPlaceWordParams,
  CreateGridBodyResult,
  GetPatternGridParams,
  OccurrencesMap,
  WordOperationParams,
  WordsCount,
} from "./types";

const REGIONAL_STAGE_GRID_AREA = 16;

class ImagesGenerator {
  public generate(images: ImageItem[], gridSize: GridSize): ImageItem[] {
    const groupedImages = groupImagesByCategory(images);
    const occurrencesMap = this.buildOccurrencesMap(groupedImages);
    const words = Object.keys(occurrencesMap);
    const totalCells = gridSize.rows * gridSize.columns;

    this.validateGridSize(totalCells, occurrencesMap);

    const maxArea = this.calculateMaxGridArea(occurrencesMap);
    const currentArea = gridSize.rows * gridSize.columns;
    const enforceColumnRowConstraints =
      maxArea >= currentArea && currentArea <= REGIONAL_STAGE_GRID_AREA;
    const enforceRowConstraints = gridSize.columns <= words.length;

    const { grid, rowWords, colWords, wordCounts } = this.createGridBody(
      gridSize,
      words,
    );

    if (
      !this.getPatternGrid({
        cellIndex: 0,
        grid,
        gridSize,
        words,
        totalCells,
        occurrencesMap,
        wordCounts,
        rowWords,
        colWords,
        enforceRowConstraints,
        enforceColumnRowConstraints,
      })
    ) {
      throw new Error(
        `Cannot fill ${gridSize.string} grid with given constraints`,
      );
    }

    const neededPerWord = this.countNeededPerWord(grid, gridSize, words);
    this.validateImageAvailability(neededPerWord, groupedImages);

    return this.buildResult({
      grid,
      gridSize,
      words,
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

  private validateGridSize(
    totalCells: number,
    occurrencesMap: OccurrencesMap,
  ): void {
    const totalMaxOccurrences = Object.values(occurrencesMap).reduce(
      (sum, max) => sum + max,
      0,
    );
    if (totalCells > totalMaxOccurrences) {
      throw new Error(
        `Grid size ${totalCells} exceeds total max occurrences ${totalMaxOccurrences}`,
      );
    }
  }

  private calculateMaxGridArea(occurrencesMap: OccurrencesMap): number {
    const words = Object.keys(occurrencesMap);
    const maxOccurrences = Object.values(occurrencesMap);
    const totalMaxOccurrences = maxOccurrences.reduce(
      (sum, max) => sum + max,
      0,
    );
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

  private createGridBody(
    gridSize: GridSize,
    words: string[],
  ): CreateGridBodyResult {
    const grid: (string | null)[][] = Array(gridSize.rows)
      .fill(null)
      .map(() => Array(gridSize.columns).fill(null));

    const wordCounts: WordsCount = {};
    words.forEach((word) => {
      wordCounts[word] = 0;
    });

    const rowWords: Set<string>[] = Array(gridSize.rows)
      .fill(null)
      .map(() => new Set());
    const colWords: Set<string>[] = Array(gridSize.columns)
      .fill(null)
      .map(() => new Set());

    return { grid, rowWords, colWords, wordCounts };
  }

  private canPlaceWord({
    word,
    row,
    col,
    grid,
    gridSize,
    rowWords,
    colWords,
    wordCounts,
    occurrencesMap,
    enforceRowConstraints,
    enforceColumnRowConstraints,
  }: CanPlaceWordParams): boolean {
    if (wordCounts[word] >= occurrencesMap[word]) {
      return false;
    }

    const rowHasWord = rowWords[row].has(word);
    const colHasWord = colWords[col].has(word);

    if (enforceColumnRowConstraints && (colHasWord || rowHasWord)) {
      return false;
    } else if (enforceRowConstraints && rowHasWord) {
      return false;
    }

    // Check no touching horizontally/vertically (always enforced)
    const horizontalVerticalDirections = [
      [-1, 0], // up
      [1, 0], // down
      [0, -1], // left
      [0, 1], // right
    ];

    for (const [dr, dc] of horizontalVerticalDirections) {
      const nr = row + dr;
      const nc = col + dc;
      if (
        nr >= 0 &&
        nr < gridSize.rows &&
        nc >= 0 &&
        nc < gridSize.columns &&
        grid[nr][nc] === word
      ) {
        return false;
      }
    }

    const diagonalDirections = [
      [-1, -1],
      [-1, 1],
      [1, -1],
      [1, 1],
    ];
    const canTouchDiagonally = getRandomInt(1, 10) <= 3;

    for (const [dr, dc] of diagonalDirections) {
      const nr = row + dr;
      const nc = col + dc;
      if (
        nr >= 0 &&
        nr < gridSize.rows &&
        nc >= 0 &&
        nc < gridSize.columns &&
        grid[nr][nc] === word
      ) {
        if (!canTouchDiagonally) return false;

        // Block chains of 3 along the same diagonal
        const rr = nr + dr;
        const cc = nc + dc;
        if (
          rr >= 0 &&
          rr < gridSize.rows &&
          cc >= 0 &&
          cc < gridSize.columns &&
          grid[rr][cc] === word
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
          adj1c < gridSize.columns &&
          adj2r >= 0 &&
          adj2r < gridSize.rows &&
          adj2c >= 0 &&
          adj2c < gridSize.columns &&
          grid[adj1r][adj1c] === word &&
          grid[adj2r][adj2c] === word
        ) {
          return false;
        }
      }
    }

    return true;
  }

  private placeWord({
    word,
    row,
    col,
    grid,
    rowWords,
    colWords,
    wordCounts,
  }: WordOperationParams): void {
    grid[row][col] = word;
    wordCounts[word]++;
    rowWords[row].add(word);
    colWords[col].add(word);
  }

  private removeWord({
    word,
    row,
    col,
    grid,
    rowWords,
    colWords,
    wordCounts,
  }: WordOperationParams): void {
    grid[row][col] = null;
    wordCounts[word]--;
    rowWords[row].delete(word);
    colWords[col].delete(word);
  }

  private getPatternGrid({
    cellIndex,
    grid,
    gridSize,
    words,
    totalCells,
    occurrencesMap,
    wordCounts,
    rowWords,
    colWords,
    enforceRowConstraints,
    enforceColumnRowConstraints,
  }: GetPatternGridParams): boolean {
    if (cellIndex === totalCells) {
      return true;
    }

    const row = Math.floor(cellIndex / gridSize.columns);
    const col = cellIndex % gridSize.columns;

    const shuffledWords = [...words].sort(() => getRandomInt(1, 1000) - 500);

    for (const word of shuffledWords) {
      if (
        this.canPlaceWord({
          word,
          row,
          col,
          grid,
          gridSize,
          rowWords,
          colWords,
          wordCounts,
          occurrencesMap,
          enforceRowConstraints,
          enforceColumnRowConstraints,
        })
      ) {
        this.placeWord({
          word,
          row,
          col,
          grid,
          rowWords,
          colWords,
          wordCounts,
        });

        if (
          this.getPatternGrid({
            cellIndex: cellIndex + 1,
            grid,
            gridSize,
            words,
            totalCells,
            occurrencesMap,
            wordCounts,
            rowWords,
            colWords,
            enforceRowConstraints,
            enforceColumnRowConstraints,
          })
        ) {
          return true;
        }

        this.removeWord({
          word,
          row,
          col,
          grid,
          rowWords,
          colWords,
          wordCounts,
        });
      }
    }

    return false;
  }

  private countNeededPerWord(
    grid: (string | null)[][],
    gridSize: GridSize,
    words: string[],
  ): WordsCount {
    const neededPerWord: WordsCount = {};
    for (const word of words) neededPerWord[word] = 0;
    for (let row = 0; row < gridSize.rows; row++) {
      for (let col = 0; col < gridSize.columns; col++) {
        const word = grid[row][col];
        if (!word) continue;
        neededPerWord[word] += 1;
      }
    }
    return neededPerWord;
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
    grid,
    gridSize,
    words,
    groupedImages,
    neededPerWord,
  }: BuildResultParams): ImageItem[] {
    const imagePools: Record<string, ImageItem[]> = {};
    for (const word of words) {
      imagePools[word] = structuredClone(groupedImages[word]);
    }

    const result: ImageItem[] = [];
    for (let row = 0; row < gridSize.rows; row++) {
      for (let col = 0; col < gridSize.columns; col++) {
        const word = grid[row][col];
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
