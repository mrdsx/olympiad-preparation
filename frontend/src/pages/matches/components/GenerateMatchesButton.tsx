import { Button } from "@/components/ui/button";
import { useCountdownStore } from "@/features/countdown";
import {
  generateImages,
  useGridLayoutStore,
  useImagesStore,
} from "@/features/grid";
import { useTrainingStore } from "@/features/training";
import { useSchoolGradeStore } from "@/features/training/schoolGradeStore";
import { MEMORIZATION_TIME } from "@/lib/constants";

function GenerateMatchesButton() {
  const setRemainingTime = useCountdownStore((state) => state.setRemainingTime);
  const gridLayout = useGridLayoutStore((state) => state.gridLayout);
  const setImages = useImagesStore((state) => state.setImages);
  const setIsFinished = useTrainingStore((state) => state.setIsFinished);
  const setIsRemembering = useTrainingStore((state) => state.setIsRemembering);
  const schoolGrade = useSchoolGradeStore((state) => state.schoolGrade);

  function handleClick() {
    const length = gridLayout.columns * gridLayout.rows;
    setImages(generateImages(length, schoolGrade));
    setIsFinished(false);
    setIsRemembering(true);
    setRemainingTime(MEMORIZATION_TIME);
  }

  return <Button onClick={handleClick}>Генерировать соответствия</Button>;
}

export { GenerateMatchesButton };
