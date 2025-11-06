import { groupWordsByLength, useAnagramsStore } from "@/features/word-game";

function BaseAnagramsList() {
  const anagrams = useAnagramsStore((state) => state.anagrams);
  const areVisible = useAnagramsStore((state) => state.areVisible);
  const groupedAnagrams = groupWordsByLength(anagrams);

  if (!areVisible) return;

  return (
    <ul className="w-[90vw] md:w-[50vw]">
      {Object.entries(groupedAnagrams)
        .reverse()
        .map(([wordLength, anagrams]) => (
          <li key={wordLength}>
            <h2 className="text-xl font-semibold">{wordLength}</h2>
            <p>{anagrams.join(", ")}</p>
            {/* {anagrams.map((anagram) => (
              <AnagramHoverCard anagram={anagram} key={anagram} />
            ))} */}
          </li>
        ))}
    </ul>
  );
}

export { BaseAnagramsList };
