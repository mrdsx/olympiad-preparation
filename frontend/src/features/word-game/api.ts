import { apiFetch } from "@/lib/api";
import type { AnagramsResponse, WordExplanationResponse } from "./types";

async function getAnagrams(baseWord: string): Promise<AnagramsResponse> {
  return await apiFetch(`/word-game/anagrams?base_word=${baseWord}`);
}

async function getWordExplanation(
  word: string,
): Promise<WordExplanationResponse> {
  return await apiFetch(
    `/word-game/explain-word?word=${word}`,
    {},
    "Не удалось найти значение слова",
  );
}

async function getWordWithAnagrams(): Promise<AnagramsResponse> {
  return await apiFetch(`/word-game`);
}

export { getAnagrams, getWordExplanation, getWordWithAnagrams };
