import { queryKeys } from "@/lib/constants";
import { useMutation } from "@tanstack/react-query";
import { getAnagrams, getWordWithAnagrams } from "./api";

const wordGameRepository = {
  useAnagramsMutation: () =>
    useMutation({
      mutationKey: [queryKeys.GET_ANAGRAMS],
      mutationFn: (baseWord: string) => getAnagrams(baseWord),
    }),
  useGenerateWordMutation: () =>
    useMutation({
      mutationKey: [queryKeys.RANDOM_WORD],
      mutationFn: () => getWordWithAnagrams(),
    }),
};

export { wordGameRepository };
