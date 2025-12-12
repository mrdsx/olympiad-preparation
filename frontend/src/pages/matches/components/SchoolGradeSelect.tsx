import { useEffect } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  type SchoolGrade,
  useGridSettings,
  useOlympiadStageStore,
  useSchoolGradeStore,
} from "@/features/matches";

function SchoolGradeSelect() {
  const { onSchoolGradeChange, onSchoolGradeOrOlympiadStageChange } =
    useGridSettings();
  const isFinalOlympiadStage = useOlympiadStageStore(
    (state) => state.isFinalOlympiadStage,
  );
  const { schoolGrade, setSchoolGrade } = useSchoolGradeStore();

  useEffect(() => {
    onSchoolGradeChange(schoolGrade);
    onSchoolGradeOrOlympiadStageChange(schoolGrade, isFinalOlympiadStage);
  }, []); // eslint-disable-line

  function handleValueChange(schoolGrade: SchoolGrade): void {
    setSchoolGrade(schoolGrade);
    onSchoolGradeChange(schoolGrade);
    onSchoolGradeOrOlympiadStageChange(schoolGrade, isFinalOlympiadStage);
  }

  return (
    <Select value={schoolGrade} onValueChange={handleValueChange}>
      <SelectTrigger className="w-50">
        <SelectValue placeholder="Класс" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="2">2 класс</SelectItem>
        <SelectItem value="3_4">3-4 класс</SelectItem>
        <SelectItem value="5_6">5-6 класс</SelectItem>
        <SelectItem value="7_11">7-11 класс</SelectItem>
      </SelectContent>
    </Select>
  );
}

export { SchoolGradeSelect };
