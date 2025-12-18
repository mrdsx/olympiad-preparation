import type { UseMutationOptions } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/lib/constants";

import { getAnagrams, getWordExplanation, getWordWithAnagrams } from "./api";
import type { AnagramsResponse, WordExplanationResponse } from "./types";

function createExplainWordMutationOptions(): UseMutationOptions<
  WordExplanationResponse,
  Error,
  string
> {
  return {
    mutationKey: [QUERY_KEYS.GET_WORD_EXPLANATION],
    mutationFn: (word: string) => getWordExplanation(word),
  };
}

function createGenerateAnagramsMutationOptions(): UseMutationOptions<
  AnagramsResponse,
  Error,
  string
> {
  return {
    mutationKey: [QUERY_KEYS.GET_ANAGRAMS],
    mutationFn: (baseWord: string) => getAnagrams(baseWord),
  };
}

function createGenerateWordMutationOptions(): UseMutationOptions<
  AnagramsResponse,
  Error
> {
  return {
    mutationKey: [QUERY_KEYS.GET_RANDOM_WORD],
    mutationFn: () => getWordWithAnagrams(),
  };
}

export {
  createExplainWordMutationOptions,
  createGenerateAnagramsMutationOptions,
  createGenerateWordMutationOptions,
};
