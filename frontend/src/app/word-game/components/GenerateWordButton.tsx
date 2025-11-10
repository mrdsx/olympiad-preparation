import { PendingButton } from "@/components/PendingButton";
import { Button } from "@/components/ui/button";
import {
  useAnagramsStore,
  useBaseWordStore,
  wordGameRepository,
} from "@/features/word-game";

type GenerateWordButtonProps = {
  mutation: ReturnType<(typeof wordGameRepository)["useGenerateWordMutation"]>;
};

function GenerateWordButton({ mutation }: GenerateWordButtonProps) {
  const setBaseWord = useBaseWordStore((state) => state.setBaseWord);
  const setAnagrams = useAnagramsStore((state) => state.setAnagrams);

  const { isPending, mutate } = mutation;

  if (isPending) return <PendingButton>Генерация</PendingButton>;

  return (
    <Button
      onClick={() =>
        mutate(undefined, {
          onSuccess: (data) => {
            setBaseWord(data.base_word);
            setAnagrams(data.anagrams);
          },
        })
      }
    >
      Генерировать слово
    </Button>
  );
}

export { GenerateWordButton };
