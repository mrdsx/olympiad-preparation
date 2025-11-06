"use client";

import {
  SelectWordGameMode,
  useWordGameModeStore,
  wordGameRepository,
} from "@/features/word-game";
import { BaseAnagramsList } from "./components/BaseAnagramsList";
import { BaseWordTitle } from "./components/BaseWordTitle";
import { CreateWordsForm } from "./components/CreateWordsForm";
import { ErrorText } from "./components/ErrorText";
import { GenerateWordButton } from "./components/GenerateWordButton";
import { SwitchAnagramsVisibility } from "./components/SwitchAnagramsVisibility";
import { UserAnagramsList } from "./components/UserAnagramsList";

function WordGamePage() {
  const wordGameMode = useWordGameModeStore((state) => state.wordGameMode);

  const { useAnagramsMutation, useGenerateWordMutation } = wordGameRepository;
  const anagramsMutation = useAnagramsMutation();
  const generateWordMutation = useGenerateWordMutation();

  return (
    <>
      <span>Выберите режим:</span>
      <div className="flex flex-col items-center gap-3">
        <SelectWordGameMode />
        {wordGameMode === "generation" ? (
          <>
            <SwitchAnagramsVisibility />
            <GenerateWordButton mutation={generateWordMutation} />
          </>
        ) : (
          <CreateWordsForm mutation={anagramsMutation} />
        )}
      </div>
      {wordGameMode === "generation" ? (
        <ErrorText
          message="Ошибка при генерации слова"
          isError={generateWordMutation.isError}
        />
      ) : (
        <ErrorText
          message="Ошибка при генерации слов"
          isError={anagramsMutation.isError}
        />
      )}
      {wordGameMode === "generation" && <BaseWordTitle />}

      {/* Anagrams */}
      {wordGameMode === "generation" ? (
        <BaseAnagramsList />
      ) : (
        <UserAnagramsList />
      )}
    </>
  );
}

export default WordGamePage;
