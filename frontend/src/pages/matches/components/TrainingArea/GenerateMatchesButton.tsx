import { Button } from "@/components/ui/button";
import { useCountdownStore } from "@/features/countdown";
import {
  handleImagesGeneration,
  useCountdownSettingsStore,
  useGridSizeStore,
  useImagesStore,
  useOlympiadStageStore,
  useSchoolGradeStore,
  useTrainingStore,
} from "@/features/matches";
import { SECONDS_IN_MINUTE } from "@/lib/constants";

function GenerateMatchesButton() {
  const setRemainingTime = useCountdownStore((state) => state.setRemainingTime);
  const { minutes, seconds } = useCountdownSettingsStore(
    (state) => state.memorizationTime,
  );
  const gridSize = useGridSizeStore((state) => state.gridSize);
  const setApplyGrayscale = useImagesStore((state) => state.setApplyGrayscale);
  const setImages = useImagesStore((state) => state.setImages);
  const isFinalOlympiadStage = useOlympiadStageStore(
    (state) => state.isFinalOlympiadStage,
  );
  const setIsFinished = useTrainingStore((state) => state.setIsFinished);
  const setIsRemembering = useTrainingStore((state) => state.setIsRemembering);
  const schoolGrade = useSchoolGradeStore((state) => state.schoolGrade);

  function handleClick() {
    const { applyGrayscale, images } = handleImagesGeneration(
      gridSize,
      schoolGrade,
      isFinalOlympiadStage,
    );
    const remainingTime = minutes * SECONDS_IN_MINUTE + seconds;

    setImages(images);
    setApplyGrayscale(applyGrayscale);
    setIsFinished(false);
    setIsRemembering(true);
    setRemainingTime(remainingTime);
  }

  return <Button onClick={handleClick}>Генерировать соответствия</Button>;
}

export { GenerateMatchesButton };
