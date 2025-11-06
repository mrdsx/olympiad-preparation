"use client";

import { path } from "@/lib/constants";
import { usePathname } from "next/navigation";
import { createContext, useEffect, useRef } from "react";
import { useTrainingStore } from "../training";

type CountdownContextType = {};

const CountdownContext = createContext<CountdownContextType | null>(null);

function CountdownProvider({ children }: React.PropsWithChildren) {
  const { reset } = useTrainingStore();
  const pathname = usePathname();
  const previousPathnameRef = useRef<string>(null);

  useEffect(() => {
    if (previousPathnameRef.current === path.MATCHES) reset();
    previousPathnameRef.current = pathname;
  }, [pathname]);

  return (
    <CountdownContext.Provider value={null}>
      {children}
    </CountdownContext.Provider>
  );
}

export { CountdownProvider };
