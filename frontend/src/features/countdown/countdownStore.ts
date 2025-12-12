import { create } from "zustand";

type T = number;

type CountdownState = {
  remainingTime: T;
  decrementRemainingTime: () => void;
  setRemainingTime: (seconds: T) => void;
};

const useCountdownStore = create<CountdownState>((set) => ({
  remainingTime: 0,
  decrementRemainingTime: () => {
    set((state) => ({
      remainingTime: state.remainingTime - 1,
    }));
  },
  setRemainingTime: (seconds: T) => set({ remainingTime: seconds }),
}));

export { useCountdownStore };
