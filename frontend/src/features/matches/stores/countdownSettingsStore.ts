import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { PSK } from "@/lib/constants";

type T = {
  minutes: number;
  seconds: number;
};

type CountdownSettingsState = {
  memorizationTime: T;
  writingAnswersTime: T;
  setMemorizationTime: (memorizationTime: T) => void;
  setWritingAnswersTime: (writingAnswersTime: T) => void;
  reset: () => void;
};

const MAX_SECONDS = 59;
const MAX_MINUTES_MEMORIZING = 10;
const MAX_MINUTES_WRITING_ANSWERS = 30;

const useCountdownSettingsStore = create<CountdownSettingsState>()(
  persist(
    (set, _get, store) => ({
      memorizationTime: {
        minutes: 1,
        seconds: 0,
      },
      writingAnswersTime: {
        minutes: 4,
        seconds: 0,
      },
      setMemorizationTime: ({ minutes, seconds }: T) => {
        if (isNaN(minutes) || isNaN(seconds)) return;
        if (seconds > MAX_SECONDS) seconds = MAX_SECONDS;
        if (minutes >= MAX_MINUTES_MEMORIZING) {
          minutes = MAX_MINUTES_MEMORIZING;
          seconds = 0;
        }
        set({
          memorizationTime: { minutes, seconds },
        });
      },
      setWritingAnswersTime: ({ minutes, seconds }: T) => {
        if (isNaN(minutes) || isNaN(seconds)) return;
        if (seconds > MAX_SECONDS) seconds = MAX_SECONDS;
        if (minutes >= MAX_MINUTES_WRITING_ANSWERS) {
          minutes = MAX_MINUTES_WRITING_ANSWERS;
          seconds = 0;
        }
        set({
          writingAnswersTime: {
            minutes,
            seconds,
          },
        });
      },
      reset: () => set(store.getInitialState()),
    }),
    {
      name: PSK.COUNTDOWN_SETTINGS_STORAGE,
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export { useCountdownSettingsStore };
