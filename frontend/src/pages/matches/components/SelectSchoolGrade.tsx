import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGrid, type SchoolGrade } from "@/features/grid";
import {
  useOlympiadStageStore,
  useSchoolGradeStore,
} from "@/features/training";
import { useEffect } from "react";

function SelectSchoolGrade() {
  const { onSchoolGradeChange, onSchoolGradeOrOlympiadStageChange } = useGrid();
  const isFinalOlympiadStage = useOlympiadStageStore(
    (state) => state.isFinalOlympiadStage,
  );
  const { schoolGrade, setSchoolGrade } = useSchoolGradeStore();

  useEffect(() => {
    onSchoolGradeChange(schoolGrade);
    onSchoolGradeOrOlympiadStageChange(schoolGrade, isFinalOlympiadStage);
  }, []);

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

export { SelectSchoolGrade };
