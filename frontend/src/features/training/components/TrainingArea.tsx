"use client";

import { useCountdownEffect } from "@/features/countdown";
import { MatchesGrid } from "@/features/grid";
import { useRef } from "react";
import { useTrainingStore } from "../trainingStore";
import { GenerateMatchesButton } from "./GenerateMatchesButton";
import { RevealAnswersButton } from "./RevealAnswersButton";

function TrainingArea() {
  const { isFinished, isRemembering } = useTrainingStore();
  const { showAnswers } = useTrainingStore();
  const intervalRef = useRef<NodeJS.Timeout>(undefined);

  useCountdownEffect(intervalRef);

  if (isRemembering) return <MatchesGrid />;
  if (isFinished) return <GenerateMatchesButton />;
  if (showAnswers) return <MatchesGrid showAnswers />;
  return <RevealAnswersButton />;
}

export { TrainingArea };
