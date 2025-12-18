import { H1 } from "@/components/ui/typography-h1";
import { GridSettingsProvider } from "@/features/matches";

import {
  GridSizeSelect,
  MatchesCountdown,
  OlympiadStageSwitch,
  SchoolGradeSelect,
  TrainingArea,
} from "./components";
import { CountdownSettingsPopover } from "./components/CountdownSettingsPopover";

function MatchesPage() {
  return (
    <>
      <H1>Выберите настройки:</H1>
      <div className="absolute top-22 left-2 flex flex-col items-center gap-1 sm:left-4">
        <CountdownSettingsPopover />
        <MatchesCountdown />
      </div>
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
