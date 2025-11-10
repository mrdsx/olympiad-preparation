const HTTP_TOO_MANY_REQUESTS = 429;
const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://127.0.0.1:8000";

const queryKeys = {
  GET_ANAGRAMS: "get-anagrams",
  GET_RANDOM_WORD: "get-random-word",
  GET_WORD_EXPLANATION: "get-word-explanation",
} as const;

const path = {
  ROOT: "/",
  MATCHES: "/matches",
  WORD_GAME: "/word-game",
} as const;

export { BACKEND_URL, HTTP_TOO_MANY_REQUESTS, path, queryKeys };
