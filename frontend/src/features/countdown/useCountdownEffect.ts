"use client";

import { useTrainingStore } from "@/features/training";
import { useEffect } from "react";
import { useCountdownStore } from "../countdown";

function useCountdownEffect(
  intervalRef: React.RefObject<NodeJS.Timeout | undefined>
) {
  const { isFinished, isRemembering, setIsRemembering } = useTrainingStore();
  const { remainingTime, setRemainingTime, decrementRemainingTime } =
    useCountdownStore();
  const isWritingAnswers = !isFinished && !isRemembering;

  useEffect(() => {
    if (remainingTime >= 0) return;

    setRemainingTime(0);
    if (isRemembering) setIsRemembering(false);
    if (isWritingAnswers) {
      clearInterval(intervalRef.current);
      setRemainingTime(0);
    }
  }, [remainingTime]);

  useEffect(() => {
    if (isRemembering) {
      intervalRef.current = setInterval(() => {
        decrementRemainingTime();
      }, 1000);
    }

    return () => clearInterval(intervalRef.current);
  }, [isFinished]);

  useEffect(() => {
    if (isWritingAnswers) {
      setRemainingTime(4 * 60); // ! ALWAYS set 4 minutes (4 * 60)
      intervalRef.current = setInterval(() => {
        decrementRemainingTime();
      }, 1000);
    }

    return () => clearInterval(intervalRef.current);
  }, [isWritingAnswers]);
}

export { useCountdownEffect };
