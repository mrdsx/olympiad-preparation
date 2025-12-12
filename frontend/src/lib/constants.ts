import type { SchoolGrade } from "@/features/matches";

const HTTP_TOO_MANY_REQUESTS = 429;
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL ?? "http://127.0.0.1:8000";

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const MAX_IMAGE_WIDTH = 160;
const MEMORIZATION_TIME = Number(import.meta.env.VITE_MEMORIZATION_TIME ?? 60); // 1 minute
const WRITING_ANSWERS_TIME = Number(
  import.meta.env.VITE_WRITING_ANSWERS_TIME ?? 60 * 4,
); // defaults to 4 minutes

const GRADES_2_4: SchoolGrade[] = ["2", "3_4"];
const GRADES_5_11: SchoolGrade[] = ["5_6", "7_11"];

// persistent storages keys
const PSK = {
  ANAGRAMS_STORAGE: "anagrams-storage",
  BASE_WORD_STORAGE: "base-word-storage",
  GRID_LAYOUT_STORAGE: "grid-layout-storage",
  IMAGES_STORAGE: "images-storage",
  OLYMPIAD_STAGE_STORAGE: "olympiad-stage-storage",
  SCHOOL_GRADE_STORAGE: "school-grade-storage",
  USER_ANAGRAMS_STORAGE: "user-anagrams-storage",
  USER_WORD_STORAGE: "user-word-storage",
  WORD_GAME_MODE_STORAGE: "word-game-mode-storage",
};

const QUERY_KEYS = {
  GET_ANAGRAMS: "get-anagrams",
  GET_RANDOM_WORD: "get-random-word",
  GET_WORD_EXPLANATION: "get-word-explanation",
} as const;

const PATH = {
  ROOT: "/",
  DATASET: {
    SEGMENT: "/dataset/:id",
    REGION_2_4: "/dataset/region-2-4",
    REGION_5_11: "/dataset/region-5-11",
    FINAL_3_4: "/dataset/final-3-4",
    FINAL_5_6: "/dataset/final-5-6",
    FINAL_7_11: "/dataset/final-7-11",
  },
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
  PSK,
  QUERY_KEYS,
  WRITING_ANSWERS_TIME,
};
