import { useMutation } from "@tanstack/react-query";

import { ErrorText } from "@/components/ErrorText";
import { createGenerateAnagramsMutationOptions } from "@/features/word-game";

import { GenerateAnagramsForm } from "./GenerateAnagramsForm";
import { UserAnagramsList } from "./UserAnagramsList";

function InputAnagramsMode() {
  const anagramsMutation = useMutation(createGenerateAnagramsMutationOptions());

  return (
    <>
      <GenerateAnagramsForm mutation={anagramsMutation} />
      <ErrorText
        message="Ошибка при генерации слов"
        isError={anagramsMutation.isError}
      />
      <UserAnagramsList />
    </>
  );
}

export { InputAnagramsMode };
