const SECONDS_IN_MINUTE = 60;

type CountdownProps = {
  isHidden: boolean;
  remainingTime: number;
} & React.ComponentProps<"span">;

function Countdown({ isHidden, remainingTime, ...props }: CountdownProps) {
  if (isHidden) return;

  const remainingMinutes: number = Math.floor(
    remainingTime / SECONDS_IN_MINUTE,
  );
  let remainingSeconds: string | number = remainingTime % SECONDS_IN_MINUTE;
  if (remainingSeconds < 10) {
    remainingSeconds = `0${remainingSeconds}`;
  }

  return (
    <span {...props}>
      {remainingMinutes}:{remainingSeconds}
    </span>
  );
}

export { Countdown };
