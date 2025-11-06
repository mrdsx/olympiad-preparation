"use client";

import { useTrainingStore } from "../training";
import { useCountdownStore } from "./countdownStore";

const SECONDS_IN_MINUTE = 60;

function Countdown(props: React.ComponentProps<"span">) {
  const { remainingTime } = useCountdownStore();
  const { isRemembering, isFinished, showAnswers } = useTrainingStore();

  if (showAnswers || (!isRemembering && isFinished)) return null;

  const remainingMinutes: number = Math.floor(
    remainingTime / SECONDS_IN_MINUTE,
  );
  let remainingSeconds: string | number = remainingTime % SECONDS_IN_MINUTE;
  if (remainingSeconds < 10) {
    remainingSeconds = `0${remainingSeconds}`;
  }

  return (
    <span {...props}>
      {remainingMinutes}:{remainingSeconds}
    </span>
  );
}

export { Countdown };
