import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

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
      name: "user-anagrams-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export { useUserAnagramsStore };
