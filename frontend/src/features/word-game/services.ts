import { useMutation } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/lib/constants";

import { getAnagrams, getWordExplanation, getWordWithAnagrams } from "./api";

const wordGameService = {
  useGenerateAnagramsMutation: () =>
    useMutation({
      mutationKey: [QUERY_KEYS.GET_ANAGRAMS],
      mutationFn: (baseWord: string) => getAnagrams(baseWord),
    }),
  useExplainWordMutation: () =>
    useMutation({
      mutationKey: [QUERY_KEYS.GET_WORD_EXPLANATION],
      mutationFn: (word: string) => getWordExplanation(word),
    }),
  useGenerateWordMutation: () =>
    useMutation({
      mutationKey: [QUERY_KEYS.GET_RANDOM_WORD],
      mutationFn: () => getWordWithAnagrams(),
    }),
};

export { wordGameService };
