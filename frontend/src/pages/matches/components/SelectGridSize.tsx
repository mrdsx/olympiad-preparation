import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGridLayoutStore } from "@/features/grid";
import { useTrainingStore } from "@/features/training";
import { useSchoolGradeStore } from "@/features/training/schoolGradeStore";
import { useEffect } from "react";

function SelectGridSize() {
  const { gridLayout, setGridLayout } = useGridLayoutStore();
  const schoolGrade = useSchoolGradeStore((state) => state.schoolGrade);
  const resetTrainingStore = useTrainingStore((state) => state.reset);

  useEffect(() => {
    if (schoolGrade === "2_4") {
      setGridLayout("4x4");
    }
  }, [schoolGrade]);

  function handleValueChange(value: string) {
    setGridLayout(value as "4x4" | "5x6");
    resetTrainingStore();
  }

  return (
    <Select
      value={`${gridLayout.columns}x${gridLayout.rows}`}
      onValueChange={handleValueChange}
    >
      <SelectTrigger className="w-50">
        <SelectValue placeholder="Размер сетки" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="4x4">4 столбцов, 4 строки</SelectItem>
        <SelectItem value="5x6" disabled={schoolGrade === "2_4"}>
          5 столбцов, 6 строк
        </SelectItem>
      </SelectContent>
    </Select>
  );
}

export { SelectGridSize };
