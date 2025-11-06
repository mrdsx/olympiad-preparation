const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://127.0.0.1:8000";

const queryKeys = {
  RANDOM_WORD: "random-word",
  GET_ANAGRAMS: "get-anagrams",
} as const;

const path = {
  ROOT: "/",
  MATCHES: "/matches",
  WORD_GAME: "/word-game",
} as const;

export { BACKEND_URL, path, queryKeys };
