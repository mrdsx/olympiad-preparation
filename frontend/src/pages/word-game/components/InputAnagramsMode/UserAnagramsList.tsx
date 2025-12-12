import { groupWordsByLength, useUserAnagramsStore } from "@/features/word-game";

import { AnagramPopover } from "../AnagramPopover";

function UserAnagramsList() {
  const userAnagrams = useUserAnagramsStore((state) => state.userAnagrams);
  const groupedUserAnagrams = groupWordsByLength(userAnagrams);

  return (
    <ul className="w-[90vw] md:w-[50vw]">
      {Object.entries(groupedUserAnagrams)
        .reverse()
        .map(([wordLength, anagrams]) => (
          <li key={wordLength}>
            <h2 className="text-xl font-semibold">{wordLength}</h2>
            {anagrams.map((anagram) => (
              <AnagramPopover anagram={anagram} key={anagram} />
            ))}
          </li>
        ))}
    </ul>
  );
}

export { UserAnagramsList };
