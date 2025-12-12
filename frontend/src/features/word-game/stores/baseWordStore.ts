import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { PSK } from "@/lib/constants";

type BaseWord = string;

type BaseWordState = {
  baseWord: BaseWord;
  setBaseWord: (value: BaseWord) => void;
};

const useBaseWordStore = create<BaseWordState>()(
  persist(
    (set) => ({
      baseWord: "",
      setBaseWord: (value: BaseWord) => set({ baseWord: value }),
    }),
    {
      name: PSK.BASE_WORD_STORAGE,
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export { useBaseWordStore };
