import { useEffect, useRef } from "react";

import { useTrainingStore } from "@/features/matches";

import { getImagesObject } from "../images";
import {
  useGridSizeStore,
  useOlympiadStageStore,
  useSchoolGradeStore,
} from "../stores";
import type { SchoolGrade, StringGridLayout } from "../types";

type GridSettingsContextType = {
  olympiadStageSwitchRef: React.RefObject<HTMLButtonElement | null>;
  onSchoolGradeChange: (schoolGrade: SchoolGrade) => void;
  onSchoolGradeOrOlympiadStageChange: (
    schoolGrade: SchoolGrade,
    isFinalOlympiadStage: boolean,
  ) => void;
};
// special type to use only specific grades in object without typescript error
type ValidSchoolGrade = Exclude<SchoolGrade, "2_4" | "5_11">;

const imagesObject = getImagesObject();

const FALLBACK_GRADE = "2";
const FALLBACK_GRID_LAYOUT = "4x4";
const SCHOOL_GRADES_LAYOUTS: Record<ValidSchoolGrade, StringGridLayout[]> = {
  "2": ["3x4", "4x4", "4x6"],
  "3_4": ["4x4", "5x6"],
  "5_6": ["4x4", "5x6"],
  "7_11": ["4x4", "5x6"],
};

function useGridSettingsContext(): GridSettingsContextType {
  const olympiadStageSwitchRef = useRef<HTMLButtonElement>(null);
  const { gridSize, setGridSize } = useGridSizeStore();
  const { isFinalOlympiadStage, setIsFinalOlympiadStage } =
    useOlympiadStageStore();
  const { schoolGrade, setSchoolGrade } = useSchoolGradeStore();
  const resetTrainingStore = useTrainingStore((state) => state.reset);

  const stringGridLayout = gridSize.string;

  useEffect(() => {
    resetTrainingStore();
  }, [isFinalOlympiadStage, schoolGrade, stringGridLayout, resetTrainingStore]);

  function setIsCheckboxDisabled(isDisabled: boolean): void {
    if (!olympiadStageSwitchRef.current) return;
    olympiadStageSwitchRef.current.disabled = isDisabled;
    olympiadStageSwitchRef.current.ariaDisabled = `${isDisabled}`;
  }

  function onSchoolGradeChange(schoolGrade: SchoolGrade): void {
    // checkbox side effect
    const schoolGradeHasFinalStageImages = schoolGrade in imagesObject;
    if (schoolGradeHasFinalStageImages) {
      setIsCheckboxDisabled(false);
    } else {
      setIsFinalOlympiadStage(false);
      setIsCheckboxDisabled(true);
    }

    // grid size select and school grade select side effects
    if (!(schoolGrade in SCHOOL_GRADES_LAYOUTS)) {
      const gridLayouts = SCHOOL_GRADES_LAYOUTS[FALLBACK_GRADE];
      setSchoolGrade(FALLBACK_GRADE);
      setGridSize(gridLayouts[0]);
    } else if (
      !SCHOOL_GRADES_LAYOUTS[schoolGrade as ValidSchoolGrade].includes(
        stringGridLayout,
      )
    ) {
      setGridSize(FALLBACK_GRID_LAYOUT);
    }
  }

  function onSchoolGradeOrOlympiadStageChange(
    schoolGrade: SchoolGrade,
    isFinalOlympiadStage: boolean,
  ): void {
    if (
      schoolGrade === "3_4" &&
      !isFinalOlympiadStage &&
      stringGridLayout !== "4x4"
    ) {
      setGridSize("4x4");
    }
  }

  return {
    olympiadStageSwitchRef,
    onSchoolGradeChange,
    onSchoolGradeOrOlympiadStageChange,
  };
}

export { useGridSettingsContext, type GridSettingsContextType }; // eslint-disable-line
