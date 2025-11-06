import { create } from "zustand";

type TrainingState = {
  isRemembering: boolean;
  isFinished: boolean;
  showAnswers: boolean;
  setIsRemembering: (value: boolean) => void;
  setIsFinished: (value: boolean) => void;
  setShowAnswers: (value: boolean) => void;
  reset: () => void;
};

const useTrainingStore = create<TrainingState>((set, _get, store) => ({
  isRemembering: false,
  isFinished: true,
  showAnswers: false,
  setIsRemembering: (value: boolean) => set({ isRemembering: value }),
  setIsFinished: (value: boolean) => set({ isFinished: value }),
  setShowAnswers: (value: boolean) => set({ showAnswers: value }),
  reset: () => set(store.getInitialState()),
}));

export { useTrainingStore };
