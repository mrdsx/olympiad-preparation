"use client";

import { Button } from "@/components/ui/button";
import { useTrainingStore } from "../trainingStore";

function RevealAnswersButton() {
  const { setShowAnswers } = useTrainingStore();

  return <Button onClick={() => setShowAnswers(true)}>Показать ответы</Button>;
}

export { RevealAnswersButton };
