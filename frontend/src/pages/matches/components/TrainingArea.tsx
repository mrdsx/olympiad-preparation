import { useCountdownEffect } from "@/features/countdown";
import { useTrainingStore } from "@/features/training";
import { useRef } from "react";
import { GenerateMatchesButton } from "./GenerateMatchesButton";
import { MatchesGrid } from "./MatchesGrid";
import { RevealAnswersButton } from "./RevealAnswersButton";

function TrainingArea() {
  const { isFinished, isRemembering, showAnswers } = useTrainingStore();
  const intervalRef = useRef<number | undefined>(undefined);
  useCountdownEffect(intervalRef);

  if (isRemembering) return <MatchesGrid />;
  if (isFinished) return <GenerateMatchesButton />;
  if (showAnswers) return <MatchesGrid showAnswers />;
  return <RevealAnswersButton />;
}

export { TrainingArea };
