import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

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
      name: "base-word-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export { useBaseWordStore };
