import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { PSK } from "@/lib/constants";

type T = boolean;

type ShowImagesTitlesState = {
  showTitles: T;
  setShowTitles: (value: T) => void;
};

const useShowImagesTitlesStore = create<ShowImagesTitlesState>()(
  persist(
    (set) => ({
      showTitles: true,
      setShowTitles: (value: T) => set({ showTitles: value }),
    }),
    {
      name: PSK.SHOW_IMAGES_TITLES_STORAGE,
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export { useShowImagesTitlesStore };
