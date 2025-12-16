import type { CheckedState } from "@radix-ui/react-checkbox";
import { useEffect } from "react";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  useGridSettings,
  useOlympiadStageStore,
  useSchoolGradeStore,
} from "@/features/matches";

import { OlympiadStageTooltip } from "./OlympiadStageTooltip";

function OlympiadStageSwitch() {
  const { olympiadStageSwitchRef, onSchoolGradeOrOlympiadStageChange } =
    useGridSettings();
  const { isFinalOlympiadStage, setIsFinalOlympiadStage } =
    useOlympiadStageStore();
  const schoolGrade = useSchoolGradeStore((state) => state.schoolGrade);

  useEffect(() => {
    onSchoolGradeOrOlympiadStageChange(schoolGrade, isFinalOlympiadStage);
  }, []); // eslint-disable-line

  function handleCheckedChange(isChecked: CheckedState): void {
    if (isChecked === "indeterminate") return;
    setIsFinalOlympiadStage(isChecked);
    onSchoolGradeOrOlympiadStageChange(schoolGrade, isChecked);
  }

  return (
    <div className="relative flex gap-2">
      <Switch
        id="olympiad-stage-switch"
        checked={isFinalOlympiadStage}
        onCheckedChange={handleCheckedChange}
        ref={olympiadStageSwitchRef}
      />
      <Label htmlFor="olympiad-stage-switch">Финал</Label>
      <OlympiadStageTooltip className="absolute -top-1 -right-5 size-4" />
    </div>
  );
}

export { OlympiadStageSwitch };
