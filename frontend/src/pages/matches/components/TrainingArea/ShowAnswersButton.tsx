import { Button } from "@/components/ui/button";
import { useTrainingStore } from "@/features/matches";

function ShowAnswersButton() {
  const setShowAnswers = useTrainingStore((state) => state.setShowAnswers);

  return <Button onClick={() => setShowAnswers(true)}>Показать ответы</Button>;
}

export { ShowAnswersButton };
