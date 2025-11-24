import { PendingButton } from "@/components/PendingButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  useUserAnagramsStore,
  useUserWordStore,
  wordGameRepository,
} from "@/features/word-game";

const MIN_INPUT_LENGTH = 1;
const MAX_INPUT_LENGTH = 20;

type GenerateAnagramsFormProps = {
  mutation: ReturnType<
    (typeof wordGameRepository)["useGenerateAnagramsMutation"]
  >;
};

function GenerateAnagramsForm({ mutation }: GenerateAnagramsFormProps) {
  const setUserAnagrams = useUserAnagramsStore(
    (state) => state.setUserAnagrams,
  );
  const { userWord, setUserWord } = useUserWordStore();
  const { isPending, mutate } = mutation;

  function handleSubmit(event: React.FormEvent): void {
    event.preventDefault();

    const normalizedUserWord = userWord.trim().toLowerCase();
    if (normalizedUserWord.length === 0) return;

    mutate(normalizedUserWord, {
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
