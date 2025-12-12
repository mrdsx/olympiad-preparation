import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { PSK } from "@/lib/constants";

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
      name: PSK.USER_WORD_STORAGE,
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export { useUserWordStore };
