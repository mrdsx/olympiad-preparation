import {
  type GridSize,
  type ImageItem,
  type SchoolGrade,
} from "@/features/matches";

import { getRebusesArray } from "../../rebuses";
import { RebusesInjector } from "../rebusesInjector/rebusesInjector";
import { ImagesGenerator } from "./imagesGenerator";

const rebusesArray = getRebusesArray();

class ImagesGeneratorFabric {
  public create(
    gridSize: GridSize,
    schoolGrade: SchoolGrade,
    images: ImageItem[],
  ): ImagesGenerator {
    const rebusesCount = this.getRebusesCount(schoolGrade);
    const rebusesInjector = new RebusesInjector();
    const generator = new ImagesGenerator(
      {
        images,
        gridSize,
        rebuses: rebusesArray,
        rebusesCount,
      },
      rebusesInjector,
    );

    return generator;
  }

  private getRebusesCount(schoolGrade: SchoolGrade): number {
    const gradesWithTwoRebuses: SchoolGrade[] = ["2", "3_4"];
    const gradesWithThreeRebuses: SchoolGrade[] = ["5_11", "5_6", "7_11"];

    if (gradesWithThreeRebuses.includes(schoolGrade)) {
      return 3;
    } else if (gradesWithTwoRebuses.includes(schoolGrade)) {
      return 2;
    }
    return 0;
  }
}

export { ImagesGeneratorFabric };
