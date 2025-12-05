import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { WordGameMode } from "../types";

type _WordGameMode = WordGameMode;

type WordGameModeState = {
  wordGameMode: _WordGameMode;
  setWordGameMode: (value: _WordGameMode) => void;
};

const useWordGameModeStore = create<WordGameModeState>()(
  persist(
    (set) => ({
      wordGameMode: "generation",
      setWordGameMode: (value: _WordGameMode) => set({ wordGameMode: value }),
    }),
    {
      name: "word-game-mode-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export { useWordGameModeStore };
