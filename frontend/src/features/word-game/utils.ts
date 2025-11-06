function declineWord(value: number, words: string[]) {
  value = Math.abs(value) % 100;
  const digit = value % 10;
  if (value > 10 && value < 20) return words[2];
  if (digit > 1 && digit < 5) return words[1];
  if (digit == 1) return words[0];
  return words[2];
}

function groupWordsByLength(words: string[]): Record<string, string[]> {
  const groupedWords = Object.groupBy(words, (word) => word.length);
  const sortedLengths = Object.keys(groupedWords)
    .map(Number)
    .sort((a, b) => a - b);

  const result: Record<string, string[]> = {};
  for (const length of sortedLengths) {
    const key = `${length} ${declineWord(length, ["буква", "буквы", "букв"])}`;
    result[key] = groupedWords[length]!;
  }

  return result;
}

export { groupWordsByLength };
