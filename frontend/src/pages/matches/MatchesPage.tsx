import { MatchesCountdown } from "./components/MatchesCountdown";
import { SelectGridSize } from "./components/SelectGridSize";
import { SelectSchoolGrade } from "./components/SelectSchoolGrade";
import { TrainingArea } from "./components/TrainingArea";

function MatchesPage() {
  return (
    <>
      <MatchesCountdown />
      <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
        <SelectGridSize />
        <SelectSchoolGrade />
      </div>
      <TrainingArea />
    </>
  );
}

export { MatchesPage };
