import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

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
      name: "olympiad-stage-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export { useOlympiadStageStore };
