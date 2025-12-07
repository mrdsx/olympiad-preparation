import type { SchoolGrade } from "@/features/grid";

const HTTP_TOO_MANY_REQUESTS = 429;
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL ?? "http://127.0.0.1:8000";

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const MAX_IMAGE_WIDTH = 160;
const MEMORIZATION_TIME = Number(import.meta.env.VITE_MEMORIZATION_TIME ?? 60);
const WRITING_ANSWERS_TIME = Number(
  import.meta.env.VITE_WRITING_ANSWERS_TIME ?? 60 * 4,
);

const GRADES_2_4: SchoolGrade[] = ["2", "3_4"];
const GRADES_5_11: SchoolGrade[] = ["5_6", "7_11"];

const QUERY_KEYS = {
  GET_ANAGRAMS: "get-anagrams",
  GET_RANDOM_WORD: "get-random-word",
  GET_WORD_EXPLANATION: "get-word-explanation",
} as const;

const PATH = {
  ROOT: "/",
  EXPRESSIONS: "/expressions",
  MATCHES: "/matches",
  WORD_GAME: "/word-game",
} as const;

export {
  BACKEND_URL,
  CLOUD_NAME,
  GRADES_2_4,
  GRADES_5_11,
  HTTP_TOO_MANY_REQUESTS,
  MAX_IMAGE_WIDTH,
  MEMORIZATION_TIME,
  PATH,
  QUERY_KEYS,
  WRITING_ANSWERS_TIME,
};
