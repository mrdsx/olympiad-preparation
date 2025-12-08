import { H1 } from "@/components/ui/typography-h1";
import { useWordGameModeStore, wordGameRepository } from "@/features/word-game";
import {
  BaseAnagramsList,
  BaseWordTitle,
  ErrorText,
  GenerateAnagramsForm,
  GenerateWordButton,
  SelectWordGameMode,
  SwitchAnagramsVisibility,
  UserAnagramsList,
} from "./components";

const { useGenerateAnagramsMutation, useGenerateWordMutation } =
  wordGameRepository;

function WordGamePage() {
  const wordGameMode = useWordGameModeStore((state) => state.wordGameMode);
  const anagramsMutation = useGenerateAnagramsMutation();
  const generateWordMutation = useGenerateWordMutation();

  return (
    <>
      <H1>Выберите режим:</H1>
      <div className="flex flex-col items-center gap-3">
        <SelectWordGameMode />
        {wordGameMode === "generation" ? (
          <>
            <SwitchAnagramsVisibility />
            <GenerateWordButton mutation={generateWordMutation} />
          </>
        ) : (
          <GenerateAnagramsForm mutation={anagramsMutation} />
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

export { WordGamePage };
