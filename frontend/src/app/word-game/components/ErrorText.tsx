import { CircleAlert } from "lucide-react";

type ErrorTextProps = {
  message: string;
  isError: boolean;
};

function ErrorText({ isError, message }: ErrorTextProps) {
  if (!isError) return;

  return (
    <span className="text-destructive flex items-center gap-2">
      <CircleAlert className="size-4" />
      {message}
    </span>
  );
}

export { ErrorText };
