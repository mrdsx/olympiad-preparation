import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type UserWord = string;

type UserWordState = {
  userWord: UserWord;
  setUserWord: (value: UserWord) => void;
};

const useUserWordStore = create<UserWordState>()(
  persist(
    (set) => ({
      userWord: "",
      setUserWord: (value: UserWord) => set({ userWord: value }),
    }),
    {
      name: "user-word-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export { useUserWordStore };
