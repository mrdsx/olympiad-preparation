import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type Anagrams = string[];
type AreVisible = boolean;

type AnagramsState = {
  anagrams: Anagrams;
  areVisible: AreVisible;
  setAnagrams: (value: Anagrams) => void;
  setAreVisible: (value: AreVisible) => void;
};

const useAnagramsStore = create<AnagramsState>()(
  persist(
    (set) => ({
      anagrams: [],
      areVisible: false,
      setAnagrams: (value: Anagrams) => set({ anagrams: value }),
      setAreVisible: (value: AreVisible) => set({ areVisible: value }),
    }),
    {
      name: "anagrams-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export { useAnagramsStore };
