import { Countdown } from "@/features/countdown";
import { SelectGridSize } from "@/features/grid";
import { TrainingArea } from "@/features/training";

function MatchesPage() {
  return (
    <>
      <Countdown className="absolute top-5 left-5 text-2xl" />
      <SelectGridSize />
      <TrainingArea />
    </>
  );
}

export default MatchesPage;
