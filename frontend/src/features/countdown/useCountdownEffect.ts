import { useEffect } from "react";

import {
  useCountdownSettingsStore,
  useTrainingStore,
} from "@/features/matches";
import { SECONDS_IN_MINUTE } from "@/lib/constants";

import { useCountdownStore } from "./countdownStore";

const NO_TIME_LEFT = 0;

function useCountdownEffect(intervalRef: React.RefObject<number | undefined>) {
  const { remainingTime, setRemainingTime, decrementRemainingTime } =
    useCountdownStore();
  const writingAnswersTime = useCountdownSettingsStore(
    (state) => state.writingAnswersTime,
  );
  const isFinished = useTrainingStore((state) => state.isFinished);
  const isRemembering = useTrainingStore((state) => state.isRemembering);
  const setIsRemembering = useTrainingStore((state) => state.setIsRemembering);
  const isWritingAnswers = !isFinished && !isRemembering;

  useEffect(() => {
    if (remainingTime > NO_TIME_LEFT) return;

    if (isRemembering) setIsRemembering(false);
    if (isWritingAnswers) clearInterval(intervalRef.current);
    setRemainingTime(NO_TIME_LEFT);
  }, [remainingTime, isRemembering, isWritingAnswers]); // eslint-disable-line

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      decrementRemainingTime();
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [remainingTime]); // eslint-disable-line

  useEffect(() => {
    if (!isWritingAnswers) return;
    const { minutes, seconds } = writingAnswersTime;
    setRemainingTime(minutes * SECONDS_IN_MINUTE + seconds);
  }, [isWritingAnswers, writingAnswersTime]); // eslint-disable-line
}

export { useCountdownEffect };
