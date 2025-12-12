import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { BrowserRouter } from "react-router";

import { CountdownProvider } from "@/features/countdown";

function AppProvider({ children }: React.PropsWithChildren) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <CountdownProvider>{children}</CountdownProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export { AppProvider };
