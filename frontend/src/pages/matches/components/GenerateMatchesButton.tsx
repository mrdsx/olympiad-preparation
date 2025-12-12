import { Button } from "@/components/ui/button";
import { useCountdownStore } from "@/features/countdown";
import {
  handleImagesGeneration,
  useGridSizeStore,
  useImagesStore,
  useOlympiadStageStore,
  useSchoolGradeStore,
  useTrainingStore,
} from "@/features/matches";
import { MEMORIZATION_TIME } from "@/lib/constants";

function GenerateMatchesButton() {
  const setRemainingTime = useCountdownStore((state) => state.setRemainingTime);
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

    setImages(images);
    setApplyGrayscale(applyGrayscale);
    setIsFinished(false);
    setIsRemembering(true);
    setRemainingTime(MEMORIZATION_TIME);
  }

  return <Button onClick={handleClick}>Генерировать соответствия</Button>;
}

export { GenerateMatchesButton };
