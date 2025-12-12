import { H1 } from "@/components/ui/typography-h1";
import { GridSettingsProvider } from "@/features/matches";

import {
  GridSizeSelect,
  MatchesCountdown,
  OlympiadStageSwitch,
  SchoolGradeSelect,
  TrainingArea,
} from "./components";

function MatchesPage() {
  return (
    <>
      <H1>Выберите настройки:</H1>
      <MatchesCountdown />
      <div className="flex flex-col items-center gap-2 sm:flex-row sm:items-center sm:gap-4">
        <GridSettingsProvider>
          <SchoolGradeSelect />
          <GridSizeSelect />
          <OlympiadStageSwitch />
        </GridSettingsProvider>
      </div>
      <TrainingArea />
    </>
  );
}

export { MatchesPage };
