import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { PSK } from "@/lib/constants";

import type { WordGameMode } from "../types";

type WordGameModeState = {
  wordGameMode: WordGameMode;
  setWordGameMode: (value: WordGameMode) => void;
};

const useWordGameModeStore = create<WordGameModeState>()(
  persist(
    (set) => ({
      wordGameMode: "generation",
      setWordGameMode: (value: WordGameMode) => set({ wordGameMode: value }),
    }),
    {
      name: PSK.WORD_GAME_MODE_STORAGE,
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export { useWordGameModeStore };
