import { ErrorText } from "@/components/ErrorText";
import { wordGameService } from "@/features/word-game";

import { AnagramsVisibilitySwitch } from "./AnagramsVisibilitySwitch";
import { BaseAnagramsList } from "./BaseAnagramsList";
import { BaseWordTitle } from "./BaseWordTitle";
import { GenerateWordButton } from "./GenerateWordButton";

const { useGenerateWordMutation } = wordGameService;

function GenerationMode() {
  const generateWordMutation = useGenerateWordMutation();

  return (
    <>
      <AnagramsVisibilitySwitch />
      <GenerateWordButton mutation={generateWordMutation} />
      <ErrorText
        message="Ошибка при генерации слова"
        isError={generateWordMutation.isError}
      />
      <BaseWordTitle />
      <BaseAnagramsList />
    </>
  );
}

export { GenerationMode };
