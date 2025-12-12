import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { PSK } from "@/lib/constants";

type T = boolean;

type OlympiadStageState = {
  isFinalOlympiadStage: T;
  setIsFinalOlympiadStage: (value: T) => void;
};

const useOlympiadStageStore = create<OlympiadStageState>()(
  persist(
    (set) => ({
      isFinalOlympiadStage: false,
      setIsFinalOlympiadStage: (value: T) =>
        set({ isFinalOlympiadStage: value }),
    }),
    {
      name: PSK.OLYMPIAD_STAGE_STORAGE,
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export { useOlympiadStageStore };
