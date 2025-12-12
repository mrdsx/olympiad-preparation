import { LoaderCircle } from "lucide-react";

import { Button } from "./ui/button";

function PendingButton({ children }: React.PropsWithChildren) {
  return (
    <Button disabled={true} aria-disabled={true}>
      <LoaderCircle className="animate-spin" />
      {children}
    </Button>
  );
}

export { PendingButton };
