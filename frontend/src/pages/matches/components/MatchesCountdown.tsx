import { Countdown, useCountdownStore } from "@/features/countdown";
import { useTrainingStore } from "@/features/matches";

function MatchesCountdown() {
  const remainingTime = useCountdownStore((state) => state.remainingTime);
  const { isRemembering, isFinished, showAnswers } = useTrainingStore();

  const isHidden = showAnswers || (!isRemembering && isFinished);

  return (
    <Countdown
      className="absolute top-14.5 left-3 text-xl sm:left-5"
      remainingTime={remainingTime}
      isHidden={isHidden}
    />
  );
}

export { MatchesCountdown };
