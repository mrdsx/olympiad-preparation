import { ErrorText } from "@/components/ErrorText";
import { wordGameService } from "@/features/word-game";

import { GenerateAnagramsForm } from "./GenerateAnagramsForm";
import { UserAnagramsList } from "./UserAnagramsList";

const { useGenerateAnagramsMutation } = wordGameService;

function InputAnagramsMode() {
  const anagramsMutation = useGenerateAnagramsMutation();

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
