import { H1 } from "@/components/ui/typography-h1";
import { useWordGameModeStore } from "@/features/word-game";

import {
  GenerationMode,
  InputAnagramsMode,
  WordGameModeSelect,
} from "./components";

function WordGamePage() {
  const wordGameMode = useWordGameModeStore((state) => state.wordGameMode);

  return (
    <>
      <H1>Выберите режим:</H1>
      <div className="flex flex-col items-center gap-3">
        <WordGameModeSelect />
        {wordGameMode === "generation" ? (
          <GenerationMode />
        ) : (
          <InputAnagramsMode />
        )}
      </div>
    </>
  );
}

export { WordGamePage };
