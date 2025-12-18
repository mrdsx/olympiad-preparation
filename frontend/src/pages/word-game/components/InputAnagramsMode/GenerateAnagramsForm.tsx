import type { UseMutationResult } from "@tanstack/react-query";

import { PendingButton } from "@/components/PendingButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  type AnagramsResponse,
  useUserAnagramsStore,
  useUserWordStore,
} from "@/features/word-game";

const MIN_INPUT_LENGTH = 1;
const MAX_INPUT_LENGTH = 20;

type GenerateAnagramsFormProps = {
  mutation: UseMutationResult<AnagramsResponse, Error, string>;
};

function GenerateAnagramsForm({ mutation }: GenerateAnagramsFormProps) {
  const setUserAnagrams = useUserAnagramsStore(
    (state) => state.setUserAnagrams,
  );
  const { userWord, setUserWord } = useUserWordStore();
  const { isPending, mutate } = mutation;

  function handleSubmit(event: React.FormEvent): void {
    event.preventDefault();
    const processedUserWord = userWord.trim().toLowerCase();
    if (processedUserWord.length === 0) return;

    mutate(processedUserWord, {
      onSuccess: (data) => setUserAnagrams(data.anagrams),
    });
  }

  return (
    <form
      className="flex w-[80vw] items-center gap-2 sm:w-100"
      onSubmit={handleSubmit}
    >
      <Input
        placeholder="Введите слово"
        minLength={MIN_INPUT_LENGTH}
        maxLength={MAX_INPUT_LENGTH}
        disabled={isPending}
        aria-disabled={isPending}
        value={userWord}
        onChange={(event) => setUserWord(event.target.value)}
      />
      {isPending ? (
        <PendingButton>Найти слова</PendingButton>
      ) : (
        <Button type="submit">Найти слова</Button>
      )}
    </form>
  );
}

export { GenerateAnagramsForm };
