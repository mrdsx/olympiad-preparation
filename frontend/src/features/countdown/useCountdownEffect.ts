"use client";

import { useTrainingStore } from "@/features/training";
import { useEffect } from "react";
import { useCountdownStore } from "../countdown";

const NO_TIME_LEFT = 0;

function useCountdownEffect(
  intervalRef: React.RefObject<NodeJS.Timeout | undefined>,
) {
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
      console.log("isFinished interval");
      decrementRemainingTime();
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [isFinished]);

  useEffect(() => {
    if (!isWritingAnswers) return;
    setRemainingTime(4 * 60); // ! ALWAYS set to 4 minutes (4 * 60)

    return () => clearInterval(intervalRef.current);
  }, [isWritingAnswers]);
}

export { useCountdownEffect };
