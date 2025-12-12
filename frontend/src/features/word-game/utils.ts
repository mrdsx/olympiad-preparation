import { declineWord } from "@/lib/utils";

const WORDS_LIST = ["буква", "буквы", "букв"];

function groupWordsByLength(words: string[]): Record<string, string[]> {
  const groupedWords = Object.groupBy(words, (word) => word.length);
  const sortedLengths = Object.keys(groupedWords)
    .map(Number)
    .sort((a, b) => a - b);

  const result: Record<string, string[]> = {};
  for (const length of sortedLengths) {
    const key = `${length} ${declineWord(length, WORDS_LIST)}`;
    result[key] = groupedWords[length]!;
  }

  return result;
}

export { groupWordsByLength };
