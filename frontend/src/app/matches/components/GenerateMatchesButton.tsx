"use client";

import { Button } from "@/components/ui/button";
import { useCountdownStore } from "@/features/countdown";
import {
  generateImages,
  useGridLayoutStore,
  useImagesStore,
} from "@/features/grid";
import { useTrainingStore } from "@/features/training";

const MEMORIZATION_TIME =
  Number(process.env.NEXT_PUBLIC_MEMORIZATION_TIME) || 60;

function GenerateMatchesButton() {
  const setRemainingTime = useCountdownStore((state) => state.setRemainingTime);
  const gridLayout = useGridLayoutStore((state) => state.gridLayout);
  const setImages = useImagesStore((state) => state.setImages);
  const { setIsFinished, setIsRemembering } = useTrainingStore();

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
