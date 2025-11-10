import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { BaseAPIErrorResponse } from "./types";

function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
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

function getRandomInt(min: number, max: number) {
  const range = max - min + 1;
  if (range <= 0) {
    throw new Error("Invalid range: max must be greater than or equal to min.");
  }

  const randomBytes = new Uint32Array(1);
  window.crypto.getRandomValues(randomBytes);

  return Math.floor(randomBytes[0] / (0xffffffff / range)) + min;
}

export { cn, getRandomInt, isBaseAPIErrorResponse };
