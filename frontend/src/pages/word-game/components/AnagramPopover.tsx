import { LoaderCircle } from "lucide-react";
import { useState } from "react";

import { ErrorText } from "@/components/ErrorText";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { wordGameService } from "@/features/word-game";
import { cn } from "@/lib/utils";

const { useExplainWordMutation } = wordGameService;

function AnagramPopover({ anagram }: { anagram: string }) {
  const [isFetchingAnagram, setIsFetchingAnagram] = useState<boolean>(true);
  const [anagramExplanation, setAnagramExplanation] = useState<string>("");
  const { isError, error, mutate } = useExplainWordMutation();

  function handleOpenChange(isOpen: boolean): void {
    if (!isOpen || !isFetchingAnagram) return;
    mutate(anagram, {
      onSuccess: (data) => {
        setAnagramExplanation(data.explanation);
        setIsFetchingAnagram(false);
      },
    });
  }

  return (
    <Popover onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button className="text-md touch-none px-2 font-normal" variant="link">
          {anagram}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={cn(
          "w-80",
          isFetchingAnagram ? "flex w-fit justify-center" : "",
        )}
      >
        {isError ? (
          <ErrorText message={error.message} />
        ) : isFetchingAnagram ? (
          <LoaderCircle className="animate-spin" />
        ) : (
          <div className="grid gap-2">
            <p className="max-h-50 overflow-auto">{anagramExplanation}</p>
            <p className="text-muted-foreground text-xs">
              Ответ сгенерирован ИИ. Может содержать неточности
            </p>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}

export { AnagramPopover };
