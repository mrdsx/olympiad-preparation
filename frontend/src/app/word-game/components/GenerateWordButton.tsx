import { PendingButton } from "@/components/PendingButton";
import { Button } from "@/components/ui/button";
import {
  useAnagramsStore,
  useBaseWordStore,
  wordGameRepository,
} from "@/features/word-game";
import { useEffect } from "react";

type GenerateWordButtonProps = {
  mutation: ReturnType<(typeof wordGameRepository)["useGenerateWordMutation"]>;
};

function GenerateWordButton({ mutation }: GenerateWordButtonProps) {
  const setBaseWord = useBaseWordStore((state) => state.setBaseWord);
  const setAnagrams = useAnagramsStore((state) => state.setAnagrams);

  const { data, isPending, mutate } = mutation;

  useEffect(() => {
    if (data) {
      setBaseWord(data.base_word);
      setAnagrams(data.anagrams);
    }
  }, [data]);

  if (isPending) return <PendingButton>Генерация</PendingButton>;

  return <Button onClick={() => mutate()}>Генерировать слово</Button>;
}

export { GenerateWordButton };
