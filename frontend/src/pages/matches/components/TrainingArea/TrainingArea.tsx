import { useRef } from "react";

import { useCountdownEffect } from "@/features/countdown";
import { useTrainingStore } from "@/features/matches";

import { GenerateMatchesButton } from "./GenerateMatchesButton";
import { MatchesGrid } from "./MatchesGrid";
import { ShowAnswersButton } from "./ShowAnswersButton";

function TrainingArea() {
  const { isFinished, isRemembering, showAnswers } = useTrainingStore();
  const intervalRef = useRef<number | undefined>(undefined);
  useCountdownEffect(intervalRef);

  if (isRemembering) return <MatchesGrid />;
  if (isFinished) return <GenerateMatchesButton />;
  if (showAnswers) return <MatchesGrid showAnswers />;
  return <ShowAnswersButton />;
}

export { TrainingArea };
