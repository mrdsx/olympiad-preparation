import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGridLayoutStore, type StringGridLayout } from "@/features/grid";
import {
  useOlympiadStageStore,
  useSchoolGradeStore,
} from "@/features/training";

function SelectGridSize() {
  const { gridLayout, setGridLayout } = useGridLayoutStore();
  const isFinalOlympiadStage = useOlympiadStageStore((state) => state.isFinal);
  const schoolGrade = useSchoolGradeStore((state) => state.schoolGrade);

  function handleValueChange(value: StringGridLayout): void {
    setGridLayout(value);
  }

  return (
    <Select value={gridLayout.string} onValueChange={handleValueChange}>
      <SelectTrigger className="w-50">
        <SelectValue placeholder="Размер сетки" />
      </SelectTrigger>
      <SelectContent>
        {schoolGrade === "2" && (
          <SelectItem value="3x4">3 столбца, 4 строки</SelectItem>
        )}
        <SelectItem value="4x4">4 столбца, 4 строки</SelectItem>
        {schoolGrade === "2" && (
          <SelectItem value="4x6">4 столбца, 6 строк</SelectItem>
        )}
        {schoolGrade !== "2" && (
          <SelectItem
            value="5x6"
            // TODO: remove hardcoded condition
            disabled={!isFinalOlympiadStage && schoolGrade === "3_4"}
          >
            5 столбцов, 6 строк
          </SelectItem>
        )}
      </SelectContent>
    </Select>
  );
}

export { SelectGridSize };
