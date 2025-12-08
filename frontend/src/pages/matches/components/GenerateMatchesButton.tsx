import { Button } from "@/components/ui/button";
import { useCountdownStore } from "@/features/countdown";
import {
  generateImages,
  useGridLayoutStore,
  useImagesStore,
} from "@/features/grid";
import {
  useOlympiadStageStore,
  useSchoolGradeStore,
  useTrainingStore,
} from "@/features/training";
import { MEMORIZATION_TIME } from "@/lib/constants";

function GenerateMatchesButton() {
  const setRemainingTime = useCountdownStore((state) => state.setRemainingTime);
  const gridLayout = useGridLayoutStore((state) => state.gridLayout);
  const setApplyGrayscale = useImagesStore((state) => state.setApplyGrayscale);
  const setImages = useImagesStore((state) => state.setImages);
  const isFinalOlympiadStage = useOlympiadStageStore(
    (state) => state.isFinalOlympiadStage,
  );
  const setIsFinished = useTrainingStore((state) => state.setIsFinished);
  const setIsRemembering = useTrainingStore((state) => state.setIsRemembering);
  const schoolGrade = useSchoolGradeStore((state) => state.schoolGrade);

  function handleClick() {
    const length = gridLayout.columns * gridLayout.rows;
    const [applyGrayscale, images] = generateImages(
      length,
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
