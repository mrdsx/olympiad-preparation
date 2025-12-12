import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { type WordGameMode, useWordGameModeStore } from "@/features/word-game";

function WordGameModeSelect() {
  const { wordGameMode, setWordGameMode } = useWordGameModeStore();

  function handleValueChange(value: WordGameMode): void {
    setWordGameMode(value);
  }

  return (
    <Select value={wordGameMode} onValueChange={handleValueChange}>
      <SelectTrigger className="w-50">
        <SelectValue placeholder="Режим" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="generation">Генерация</SelectItem>
        <SelectItem value="input">Составление</SelectItem>
      </SelectContent>
    </Select>
  );
}

export { WordGameModeSelect };
