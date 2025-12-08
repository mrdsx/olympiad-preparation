import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useGrid } from "@/features/grid";
import {
  useOlympiadStageStore,
  useSchoolGradeStore,
} from "@/features/training";
import type { CheckedState } from "@radix-ui/react-checkbox";
import { useEffect } from "react";

function OlympiadStageCheckbox() {
  const { olympiadStageCheckboxRef, onSchoolGradeOrOlympiadStageChange } =
    useGrid();
  const { isFinalOlympiadStage, setIsFinalOlympiadStage } =
    useOlympiadStageStore();
  const schoolGrade = useSchoolGradeStore((state) => state.schoolGrade);

  useEffect(() => {
    onSchoolGradeOrOlympiadStageChange(schoolGrade, isFinalOlympiadStage);
  }, []);

  function handleCheckedChange(isChecked: CheckedState): void {
    if (isChecked === "indeterminate") return;
    setIsFinalOlympiadStage(isChecked);
    onSchoolGradeOrOlympiadStageChange(schoolGrade, isChecked);
  }

  return (
    <div className="flex gap-2">
      <Checkbox
        id="olympiad-stage-checkbox"
        checked={isFinalOlympiadStage}
        onCheckedChange={handleCheckedChange}
        ref={olympiadStageCheckboxRef}
      />
      <Label htmlFor="olympiad-stage-checkbox">Финал</Label>
    </div>
  );
}

export { OlympiadStageCheckbox };
