import { Button } from "@/components/ui/button";
import { useTrainingStore } from "@/features/training";

function RevealAnswersButton() {
  const setShowAnswers = useTrainingStore((state) => state.setShowAnswers);

  return <Button onClick={() => setShowAnswers(true)}>Показать ответы</Button>;
}

export { RevealAnswersButton };
