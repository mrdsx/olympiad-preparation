import { Clock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useCountdownSettingsStore } from "@/features/matches";

function CountdownSettingsPopover() {
  const {
    memorizationTime,
    writingAnswersTime,
    setMemorizationTime,
    setWritingAnswersTime,
    reset: resetCountdownSettingsStore,
  } = useCountdownSettingsStore();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <Clock />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-60">
        <div className="grid gap-5">
          <div className="grid gap-3">
            <Label htmlFor="memorizing-time-minutes">
              Время на запоминание
            </Label>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Input
                  id="memorizing-time-minutes"
                  value={memorizationTime.minutes}
                  onChange={(event) => {
                    const minutes = Number(event.target.value);
                    const { seconds } = memorizationTime;
                    setMemorizationTime({ minutes, seconds });
                  }}
                />
                <p>мин</p>
              </div>
              <div className="flex items-center gap-1">
                <Input
                  value={memorizationTime.seconds}
                  onChange={(event) => {
                    const seconds = Number(event.target.value);
                    const { minutes } = memorizationTime;
                    setMemorizationTime({ minutes, seconds });
                  }}
                />
                <p>с</p>
              </div>
            </div>
          </div>
          <div className="grid gap-3">
            <Label htmlFor="writing-answers-time-minutes">
              Время на запись
            </Label>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Input
                  id="writing-answers-time-minutes"
                  value={writingAnswersTime.minutes}
                  onChange={(event) => {
                    const minutes = Number(event.target.value);
                    const { seconds } = writingAnswersTime;
                    setWritingAnswersTime({ minutes, seconds });
                  }}
                />
                <p>мин</p>
              </div>
              <div className="flex items-center gap-1">
                <Input
                  value={writingAnswersTime.seconds}
                  onChange={(event) => {
                    const seconds = Number(event.target.value);
                    const { minutes } = writingAnswersTime;
                    setWritingAnswersTime({ minutes, seconds });
                  }}
                />
                <p>с</p>
              </div>
            </div>
          </div>
          <Button onClick={resetCountdownSettingsStore}>Сбросить</Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export { CountdownSettingsPopover };
