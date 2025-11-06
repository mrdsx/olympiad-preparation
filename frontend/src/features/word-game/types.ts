type WordGameMode = "generation" | "creation";

type AnagramsResponse = {
  anagrams: string[];
};

type WordGameResponse = {
  base_word: string;
  anagrams: string[];
};

export type { AnagramsResponse, WordGameMode, WordGameResponse };
