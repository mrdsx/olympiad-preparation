import { useMutation } from "@tanstack/react-query";

import { ErrorText } from "@/components/ErrorText";
import { createGenerateWordMutationOptions } from "@/features/word-game";

import { AnagramsVisibilitySwitch } from "./AnagramsVisibilitySwitch";
import { BaseAnagramsList } from "./BaseAnagramsList";
import { BaseWordTitle } from "./BaseWordTitle";
import { GenerateWordButton } from "./GenerateWordButton";

function GenerationMode() {
  const generateWordMutation = useMutation(createGenerateWordMutationOptions());

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
