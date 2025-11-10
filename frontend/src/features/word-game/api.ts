import { apiFetch } from "@/lib/api";
import { BACKEND_URL } from "@/lib/constants";
import { AnagramsResponse, WordExplanationResponse } from "./types";

async function getAnagrams(baseWord: string): Promise<AnagramsResponse> {
  return await apiFetch(
    `${BACKEND_URL}/word-game/anagrams?base_word=${baseWord}`,
  );
}

async function getWordExplanation(
  word: string,
): Promise<WordExplanationResponse> {
  return await apiFetch(
    `${BACKEND_URL}/word-game/explain-word?word=${word}`,
    {},
    "Не удалось найти значение слова",
  );
}

async function getWordWithAnagrams(): Promise<AnagramsResponse> {
  return await apiFetch(`${BACKEND_URL}/word-game`);
}

export { getAnagrams, getWordExplanation, getWordWithAnagrams };
