import { Countdown, useCountdownStore } from "@/features/countdown";
import { useTrainingStore } from "@/features/matches";

function MatchesCountdown() {
  const remainingTime = useCountdownStore((state) => state.remainingTime);
  const { isRemembering, isFinished, showAnswers } = useTrainingStore();

  const isHidden = showAnswers || (!isRemembering && isFinished);

  return <Countdown remainingTime={remainingTime} isHidden={isHidden} />;
}

export { MatchesCountdown };
