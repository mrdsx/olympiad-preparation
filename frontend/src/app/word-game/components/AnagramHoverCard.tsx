import { Button } from "@/components/ui/button";
import { HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { cn } from "@/lib/utils";
import { HoverCard } from "@radix-ui/react-hover-card";
import { LoaderCircle } from "lucide-react";
import { useRef, useState } from "react";

function AnagramHoverCard({ anagram }: { anagram: string }) {
  const [isPending, setIsPending] = useState<boolean>(true);
  const timeoutRef = useRef<NodeJS.Timeout>(undefined);

  return (
    <HoverCard
      onOpenChange={(isOpen) => {
        if (isOpen) {
          timeoutRef.current = setTimeout(() => setIsPending(false), 1000);
        } else {
          clearTimeout(timeoutRef.current);
        }
      }}
    >
      <HoverCardTrigger asChild>
        <Button className="text-md px-2 font-normal" variant="link">
          {anagram}
        </Button>
      </HoverCardTrigger>
      <HoverCardContent
        className={cn("w-80", isPending ? "flex w-fit justify-center" : "")}
      >
        {isPending ? (
          <LoaderCircle className="animate-spin" />
        ) : (
          <span>{anagram}</span>
        )}
      </HoverCardContent>
    </HoverCard>
  );
}

export { AnagramHoverCard };
