import { apiFetch } from "@/lib/api";
import { BACKEND_URL } from "@/lib/constants";
import { AnagramsResponse, WordGameResponse } from "./types";

async function getAnagrams(baseWord: string): Promise<AnagramsResponse> {
  return await apiFetch<AnagramsResponse>(
    `${BACKEND_URL}/word-game/anagrams?base_word=${baseWord}`,
  );
}

async function getWordWithAnagrams(): Promise<WordGameResponse> {
  return await apiFetch<WordGameResponse>(`${BACKEND_URL}/word-game`);
}

export { getAnagrams, getWordWithAnagrams };
