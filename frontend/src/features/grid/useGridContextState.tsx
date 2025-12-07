import {
  useOlympiadStageStore,
  useSchoolGradeStore,
  useTrainingStore,
} from "@/features/training";
import { useEffect, useRef } from "react";
import { getImages } from "./images";
import { useGridLayoutStore } from "./stores";
import type { SchoolGrade, StringGridLayout } from "./types";

type GridContextState = {
  olympiadStageCheckboxRef: React.RefObject<HTMLButtonElement | null>;
  syncComponentsOnSchoolGradeChange: (schoolGrade: SchoolGrade) => void;
  syncComponentsOnSchoolGradeOrOlympiadStageChange: (
    schoolGrade: SchoolGrade,
    isFinalOlympiadStage: boolean,
  ) => void;
};
// special type to use only specific grades in object without typescript errors
type ValidSchoolGrade = Exclude<SchoolGrade, "2_4" | "5_11">;

const imagesObject = getImages();

const FALLBACK_GRADE = "2";
const FALLBACK_GRID_LAYOUT = "4x4";
const SCHOOL_GRADES_LAYOUTS: Record<ValidSchoolGrade, StringGridLayout[]> = {
  "2": ["3x4", "4x4", "4x6"],
  "3_4": ["4x4", "5x6"],
  "5_6": ["4x4", "5x6"],
  "7_11": ["4x4", "5x6"],
};

function useGridContextState(): GridContextState {
  const olympiadStageCheckboxRef = useRef<HTMLButtonElement>(null);
  const { gridLayout, setGridLayout } = useGridLayoutStore();
  const { isFinal, setIsFinal } = useOlympiadStageStore();
  const { schoolGrade, setSchoolGrade } = useSchoolGradeStore();
  const resetTrainingStore = useTrainingStore((state) => state.reset);

  const stringGridLayout = gridLayout.string;

  useEffect(() => {
    resetTrainingStore();
  }, [stringGridLayout, isFinal, schoolGrade]);

  function setIsCheckboxDisabled(isDisabled: boolean): void {
    if (!olympiadStageCheckboxRef.current) return;
    olympiadStageCheckboxRef.current.disabled = isDisabled;
    olympiadStageCheckboxRef.current.ariaDisabled = `${isDisabled}`;
  }

  function syncComponentsOnSchoolGradeChange(schoolGrade: SchoolGrade): void {
    // checkbox side effect
    const schoolGradeHasFinalStageImages = schoolGrade in imagesObject;
    if (schoolGradeHasFinalStageImages) {
      setIsCheckboxDisabled(false);
    } else {
      setIsFinal(false);
      setIsCheckboxDisabled(true);
    }

    // grid size select side effect
    if (
      !SCHOOL_GRADES_LAYOUTS[schoolGrade as ValidSchoolGrade]?.includes(
        stringGridLayout,
      )
    ) {
      setGridLayout(FALLBACK_GRID_LAYOUT);
    }
  }

  function syncComponentsOnSchoolGradeOrOlympiadStageChange(
    schoolGrade: SchoolGrade,
    isFinalOlympiadStage: boolean,
  ): void {
    if (!(schoolGrade in SCHOOL_GRADES_LAYOUTS)) {
      const grid_layouts = SCHOOL_GRADES_LAYOUTS[FALLBACK_GRADE];
      setSchoolGrade(FALLBACK_GRADE);
      setGridLayout(grid_layouts[0]);
    } else if (
      schoolGrade === "3_4" &&
      !isFinalOlympiadStage &&
      stringGridLayout !== "4x4"
    ) {
      setGridLayout("4x4");
    }
  }

  return {
    olympiadStageCheckboxRef,
    syncComponentsOnSchoolGradeChange,
    syncComponentsOnSchoolGradeOrOlympiadStageChange,
  };
}

export { useGridContextState, type GridContextState };
