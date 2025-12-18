import { RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useTrainingStore } from "@/features/matches";
import type { ReactSetState } from "@/lib/types";

type MatchesActionsProps = {
  showImages: boolean;
  setShowImages: ReactSetState<boolean>;
};

function MatchesActions({ showImages, setShowImages }: MatchesActionsProps) {
  const resetTrainingStore = useTrainingStore((state) => state.reset);

  return (
    <div className="flex justify-center gap-2">
      <Button onClick={() => setShowImages((prev) => !prev)}>
        {showImages ? "Скрыть" : "Показать"} изображения
      </Button>
      <Button onClick={resetTrainingStore}>
        <RefreshCw />
      </Button>
    </div>
  );
}

export { MatchesActions };
