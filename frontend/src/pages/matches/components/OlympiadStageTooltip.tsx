import { CircleQuestionMark } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

function OlympiadStageTooltip({
  ...props
}: React.ComponentProps<typeof CircleQuestionMark>) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <CircleQuestionMark {...props} />
      </TooltipTrigger>
      <TooltipContent>
        Нужно ли использовать изображения с финального тура
      </TooltipContent>
    </Tooltip>
  );
}

export { OlympiadStageTooltip };
