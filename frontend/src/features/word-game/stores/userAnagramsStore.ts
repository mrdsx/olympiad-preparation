import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { PSK } from "@/lib/constants";

type UserAnagrams = string[];

type UserAnagramsState = {
  userAnagrams: UserAnagrams;
  setUserAnagrams: (value: UserAnagrams) => void;
};

const useUserAnagramsStore = create<UserAnagramsState>()(
  persist(
    (set) => ({
      userAnagrams: [],
      setUserAnagrams: (value: UserAnagrams) => set({ userAnagrams: value }),
    }),
    {
      name: PSK.USER_ANAGRAMS_STORAGE,
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export { useUserAnagramsStore };
