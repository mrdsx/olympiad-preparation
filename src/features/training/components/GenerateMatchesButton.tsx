"use client";

import { Button } from "@/components/ui/button";
import { useCountdownStore } from "@/features/countdown";
import {
  generateImages,
  useGridLayoutStore,
  useImagesStore,
} from "@/features/grid";
import { useTrainingStore } from "../trainingStore";

const MEMORIZATION_TIME =
  Number(process.env.NEXT_PUBLIC_MEMORIZATION_TIME) || 60;

function GenerateMatchesButton() {
  const { gridLayout } = useGridLayoutStore();
  const { setIsFinished, setIsRemembering } = useTrainingStore();
  const { setImages } = useImagesStore();
  const { setRemainingTime } = useCountdownStore();

  function handleClick() {
    const length = gridLayout.columns * gridLayout.rows;
    setImages(generateImages(length));
    setIsFinished(false);
    setIsRemembering(true);
    setRemainingTime(MEMORIZATION_TIME);
  }

  return <Button onClick={handleClick}>Генерировать соответствия</Button>;
}

export { GenerateMatchesButton };
