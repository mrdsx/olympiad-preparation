import { useRef, useState } from "react";

import { useCountdownEffect } from "@/features/countdown";
import { useTrainingStore } from "@/features/matches";

import { GenerateMatchesButton } from "./GenerateMatchesButton";
import { ExportActions } from "./MatchesGrid/ExportActions";
import { MatchesActions } from "./MatchesGrid/MatchesActions";
import { MatchesGrid } from "./MatchesGrid/MatchesGrid";
import { ShowAnswersButton } from "./ShowAnswersButton";

function TrainingArea() {
  const [showImages, setShowImages] = useState<boolean>(false);
  const matchesGridRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<number | undefined>(undefined);

  const isFinished = useTrainingStore((state) => state.isFinished);
  const isRemembering = useTrainingStore((state) => state.isRemembering);
  const showAnswers = useTrainingStore((state) => state.showAnswers);

  useCountdownEffect(intervalRef);

  if (isRemembering)
    return (
      <div className="grid gap-3">
        <MatchesGrid matchesGridRef={matchesGridRef} />
        <ExportActions matchesGridRef={matchesGridRef} />
      </div>
    );

  if (showAnswers) {
    return (
      <div className="grid gap-3">
        <MatchesActions showImages={showImages} setShowImages={setShowImages} />
        <MatchesGrid
          matchesGridRef={matchesGridRef}
          showAnswers
          showImages={showImages}
        />
        {showImages && <ExportActions matchesGridRef={matchesGridRef} />}
      </div>
    );
  }

  if (isFinished) return <GenerateMatchesButton />;

  return <ShowAnswersButton />;
}

export { TrainingArea };
