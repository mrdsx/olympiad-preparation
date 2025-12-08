import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { type BaseAPIErrorResponse } from "./types";

function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Склоняет слово согласно числу, с которым используется.
 *
 * @param {number} number - число.
 * @param {string[]} words - список слов. Шаблон: ["ед. число, им. падеж", "ед. число, род. падеж", "мн. число, род. падеж"].
 * @example
 * // Пример использования:
 * const word = declineWord(1, ["книга", "книги", "книг"]);
 * console.log(word); // Output: книга
 */
function declineWord(number: number, words: string[]): string {
  if (words.length !== 3) {
    throw new Error(
      "words array must contain at least 3 forms: [singular, genitive_singular, genitive_plural]",
    );
  }

  const lastDigit = number % 10;
  const lastTwoDigits = number % 100;

  // слова с числами 11-14 склоняются в ед. числе, род. падеже
  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
    return words[2];
  }

  if (lastDigit === 1) {
    return words[0]; // nominative singular
  } else if (lastDigit >= 2 && lastDigit <= 4) {
    return words[1]; // genitive singular
  } else {
    return words[2]; // genitive plural
  }
}

function getRandomInt(min: number, max: number): number {
  const range = max - min + 1;
  if (range <= 0) {
    throw new Error("Invalid range: max must be greater than or equal to min.");
  }

  const randomBytes = new Uint32Array(1);
  window.crypto.getRandomValues(randomBytes);

  return Math.floor(randomBytes[0] / (0xffffffff / range)) + min;
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

export { cn, declineWord, getRandomInt, isBaseAPIErrorResponse };
