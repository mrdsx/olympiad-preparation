import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useWordGameModeStore, WordGameMode } from "@/features/word-game";

function SelectWordGameMode() {
  const { wordGameMode, setWordGameMode } = useWordGameModeStore();

  return (
    <Select
      value={wordGameMode}
      onValueChange={(value) => setWordGameMode(value as WordGameMode)}
    >
      <SelectTrigger className="w-50">
        <SelectValue placeholder="Режим" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="generation">Генерация</SelectItem>
        <SelectItem value="creation">Составление</SelectItem>
      </SelectContent>
    </Select>
  );
}

export { SelectWordGameMode };
