import { create } from "zustand";

type CountdownState = {
  remainingTime: number;
  decrementRemainingTime: () => void;
  setRemainingTime: (seconds: number) => void;
};

const useCountdownStore = create<CountdownState>((set) => ({
  remainingTime: 0,
  decrementRemainingTime: () => {
    set((state) => ({
      remainingTime: state.remainingTime - 1,
    }));
  },
  setRemainingTime: (seconds: number) => set({ remainingTime: seconds }),
}));

export { useCountdownStore };
