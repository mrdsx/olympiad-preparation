const SECONDS_IN_MINUTE = 60;
const MIN_MINUTES_STRING_LENGTH = 2;

type CountdownProps = {
  isHidden: boolean;
  remainingTime: number;
} & React.ComponentProps<"span">;

function Countdown({ isHidden, remainingTime, ...props }: CountdownProps) {
  if (isHidden) return;

  const remainingMinutes: number = Math.floor(
    remainingTime / SECONDS_IN_MINUTE,
  );
  const remainingSeconds: string = String(
    remainingTime % SECONDS_IN_MINUTE,
  ).padStart(MIN_MINUTES_STRING_LENGTH, "0");

  return (
    <span {...props}>
      {remainingMinutes}:{remainingSeconds}
    </span>
  );
}

export { Countdown };
