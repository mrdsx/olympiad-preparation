import { SECONDS_IN_MINUTE } from "@/lib/constants";

const MIN_MINUTES_STRING_LENGTH = 2;

type CountdownProps = {
  isHidden: boolean;
  remainingTime: number;
} & React.ComponentProps<"span">;

function Countdown({ isHidden, remainingTime, ...props }: CountdownProps) {
  if (isHidden) return;

  const minutes = Math.floor(remainingTime / SECONDS_IN_MINUTE);
  const seconds = String(remainingTime % SECONDS_IN_MINUTE).padStart(
    MIN_MINUTES_STRING_LENGTH,
    "0",
  );

  return (
    <span {...props}>
      {minutes}:{seconds}
    </span>
  );
}

export { Countdown };
