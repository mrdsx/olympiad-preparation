import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { type BaseAPIErrorResponse } from "./types";

function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Склоняет слово согласно числу, с которым используется.
 *
 * @param {number} value - число.
 * @param {string[]} words - список слов. Шаблон: ["ед. число, им. падеж", "ед. число, род. падеж", "мн. число, род. падеж"].
 * @example
 * // Пример использования:
 * const word = declineWord(1, ["книга", "книги", "книг"]);
 * console.log(word); // Output: книга
 */
function declineWord(value: number, words: string[]): string {
  if (words.length !== 3) {
    throw new Error(
      "words array must contain at least 3 forms: [singular, genitive_singular, genitive_plural]",
    );
  }

  value = Math.abs(value) % 100;
  const digit = value % 10;

  if (value > 10 && value < 20) return words[2];
  if (digit > 1 && digit < 5) return words[1];
  if (digit == 1) return words[0];
  return words[2];
}

/**
 * Generates number within range [start, end] including start and end.
 */
function getRandomInt(start: number, end: number): number {
  const range = end - start + 1;
  if (range <= 0) {
    throw new Error("Invalid range: max must be greater than or equal to min.");
  }

  const randomBytes = new Uint32Array(1);
  window.crypto.getRandomValues(randomBytes);

  return Math.floor(randomBytes[0] / (0xffffffff / range)) + start;
}

function isBaseAPIErrorResponse(data: unknown): data is BaseAPIErrorResponse {
  return (
    data !== null &&
    typeof data === "object" &&
    "detail" in data &&
    data.detail !== null &&
    typeof data.detail === "object" &&
    "status" in data.detail &&
    "message" in data.detail &&
    "error_type" in data.detail &&
    typeof data.detail.status === "string" &&
    typeof data.detail.message === "string" &&
    typeof data.detail.error_type === "string"
  );
}

function objectValuesSum(object: Record<string, number>): number {
  return Object.values(object).reduce((total, cur) => total + cur, 0);
}

export {
  cn,
  declineWord,
  getRandomInt,
  isBaseAPIErrorResponse,
  objectValuesSum,
};
