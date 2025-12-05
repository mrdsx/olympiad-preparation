import { useBaseWordStore } from "@/features/word-game";

function BaseWordTitle() {
  const baseWord = useBaseWordStore((state) => state.baseWord);

  return <span className="text-2xl">{baseWord?.toUpperCase()}</span>;
}

export { BaseWordTitle };
