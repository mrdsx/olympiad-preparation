import { useEffect } from "react";

import { useTrainingStore } from "@/features/matches";
import { WRITING_ANSWERS_TIME } from "@/lib/constants";

import { useCountdownStore } from "./countdownStore";

const NO_TIME_LEFT = 0;

function useCountdownEffect(intervalRef: React.RefObject<number | undefined>) {
  const { isFinished, isRemembering, setIsRemembering } = useTrainingStore();
  const { remainingTime, setRemainingTime, decrementRemainingTime } =
    useCountdownStore();
  const isWritingAnswers = !isFinished && !isRemembering;

  useEffect(() => {
    if (remainingTime >= NO_TIME_LEFT) return;

    setRemainingTime(NO_TIME_LEFT);
    if (isRemembering) setIsRemembering(false);
    if (isWritingAnswers) {
      clearInterval(intervalRef.current);
      setRemainingTime(NO_TIME_LEFT);
    }
  }, [remainingTime]);

  useEffect(() => {
    if (isWritingAnswers) return;

    //* interval goes on even when isWritingAnswers === false
    intervalRef.current = setInterval(() => {
      decrementRemainingTime();
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [isFinished]);

  useEffect(() => {
    if (!isWritingAnswers) return;
    setRemainingTime(WRITING_ANSWERS_TIME);
    return () => clearInterval(intervalRef.current);
  }, [isWritingAnswers]);
}

export { useCountdownEffect };
