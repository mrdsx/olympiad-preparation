import { queryKeys } from "@/lib/constants";
import { useMutation } from "@tanstack/react-query";
import { getAnagrams, getWordExplanation, getWordWithAnagrams } from "./api";

const wordGameRepository = {
  useGenerateAnagramsMutation: () =>
    useMutation({
      mutationKey: [queryKeys.GET_ANAGRAMS],
      mutationFn: (baseWord: string) => getAnagrams(baseWord),
    }),
  useExplainWordMutation: () =>
    useMutation({
      mutationKey: [queryKeys.GET_WORD_EXPLANATION],
      mutationFn: (word: string) => getWordExplanation(word),
    }),
  useGenerateWordMutation: () =>
    useMutation({
      mutationKey: [queryKeys.GET_RANDOM_WORD],
      mutationFn: () => getWordWithAnagrams(),
    }),
};

export { wordGameRepository };
