import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
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

export { cn, getRandomInt };
