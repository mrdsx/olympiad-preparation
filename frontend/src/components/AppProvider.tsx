"use client";

import { CountdownProvider } from "@/features/countdown";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

function AppProvider({ children }: React.PropsWithChildren) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <CountdownProvider>{children}</CountdownProvider>
    </QueryClientProvider>
  );
}

export { AppProvider };
