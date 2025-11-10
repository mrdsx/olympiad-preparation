import { MatchesCountdown } from "./components/MatchesCountdown";
import { SelectGridSize } from "./components/SelectGridSize";
import { TrainingArea } from "./components/TrainingArea";

function MatchesPage() {
  return (
    <>
      <MatchesCountdown />
      <SelectGridSize />
      <TrainingArea />
    </>
  );
}

export default MatchesPage;
