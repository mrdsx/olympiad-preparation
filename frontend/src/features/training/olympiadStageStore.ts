import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type T = boolean;

type OlympiadStageState = {
  isFinal: T;
  setIsFinal: (value: T) => void;
};

const useOlympiadStageStore = create<OlympiadStageState>()(
  persist(
    (set) => ({
      isFinal: false,
      setIsFinal: (value: T) => set({ isFinal: value }),
    }),
    {
      name: "olympiad-stage-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export { useOlympiadStageStore };
