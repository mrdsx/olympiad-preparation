import { GridProvider } from "@/features/grid";
import { MatchesCountdown } from "./components/MatchesCountdown";
import { OlympiadStageCheckbox } from "./components/OlympiadStageCheckbox";
import { SelectGridSize } from "./components/SelectGridSize";
import { SelectSchoolGrade } from "./components/SelectSchoolGrade";
import { TrainingArea } from "./components/TrainingArea";

function MatchesPage() {
  return (
    <>
      <MatchesCountdown />
      <div className="flex flex-col items-center gap-2 sm:flex-row sm:items-center sm:gap-4">
        <GridProvider>
          <SelectSchoolGrade />
          <SelectGridSize />
          <OlympiadStageCheckbox />
        </GridProvider>
      </div>
      <TrainingArea />
    </>
  );
}

export { MatchesPage };
