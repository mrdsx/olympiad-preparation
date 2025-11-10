"use client";

import { path } from "@/lib/constants";
import { usePathname } from "next/navigation";
import { createContext, useEffect, useRef } from "react";
import { useTrainingStore } from "../training";

const CountdownContext = createContext<null>(null);

function CountdownProvider({ children }: React.PropsWithChildren) {
  const resetTrainingStore = useTrainingStore((state) => state.reset);
  const pathname = usePathname();
  const previousPathnameRef = useRef<string>(null);

  useEffect(() => {
    if (previousPathnameRef.current === path.MATCHES) resetTrainingStore();
    previousPathnameRef.current = pathname;
  }, [pathname]);

  return (
    <CountdownContext.Provider value={null}>
      {children}
    </CountdownContext.Provider>
  );
}

export { CountdownProvider };
