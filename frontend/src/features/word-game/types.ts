type WordGameMode = "generation" | "creation";

type AnagramsResponse = {
  base_word: string;
  anagrams: string[];
};

type WordExplanationResponse = {
  word: string;
  explanation: string;
};

export type { AnagramsResponse, WordExplanationResponse, WordGameMode };
