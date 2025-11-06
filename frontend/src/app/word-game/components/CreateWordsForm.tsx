import { PendingButton } from "@/components/PendingButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  useUserAnagramsStore,
  useUserWordStore,
  wordGameRepository,
} from "@/features/word-game";
import { useEffect } from "react";

const MIN_INPUT_LENGTH = 1;
const MAX_INPUT_LENGTH = 20;

type CreateWordsFormProps = {
  mutation: ReturnType<(typeof wordGameRepository)["useAnagramsMutation"]>;
};

function CreateWordsForm({ mutation }: CreateWordsFormProps) {
  const setUserAnagrams = useUserAnagramsStore(
    (state) => state.setUserAnagrams,
  );
  const { userWord, setUserWord } = useUserWordStore();

  const { data, isPending, mutate } = mutation;

  useEffect(() => {
    if (data) setUserAnagrams(data.anagrams);
  }, [data]);

  function handleSubmit(event: React.FormEvent): void {
    event.preventDefault();
    if (userWord.length > 0) mutate(userWord);
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

export { CreateWordsForm };
