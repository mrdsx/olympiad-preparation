"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SchoolGrade } from "@/features/grid";
import { useTrainingStore } from "@/features/training";
import { useSchoolGradeStore } from "@/features/training/schoolGradeStore";

function SelectSchoolGrade() {
  const { schoolGrade, setSchoolGrade } = useSchoolGradeStore();
  const resetTrainingStore = useTrainingStore((state) => state.reset);

  function handleValueChange(value: SchoolGrade) {
    setSchoolGrade(value);
    resetTrainingStore();
  }

  return (
    <Select value={schoolGrade} onValueChange={handleValueChange}>
      <SelectTrigger className="w-50">
        <SelectValue placeholder="Класс" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="2_4">2-4 класс</SelectItem>
        <SelectItem value="9_11">9-11 класс</SelectItem>
      </SelectContent>
    </Select>
  );
}

export { SelectSchoolGrade };
