import { createContext, useEffect, useRef } from "react";
import { useLocation } from "react-router";

import { useTrainingStore } from "@/features/matches";
import { PATH } from "@/lib/constants";

const CountdownContext = createContext<null>(null);

function CountdownProvider({ children }: React.PropsWithChildren) {
  const resetTrainingStore = useTrainingStore((state) => state.reset);
  const previousPathnameRef = useRef<string>(null);
  const { pathname } = useLocation();

  useEffect(() => {
    if (previousPathnameRef.current === PATH.MATCHES) resetTrainingStore();
    previousPathnameRef.current = pathname;
  }, [pathname, resetTrainingStore]);

  return (
    <CountdownContext.Provider value={null}>
      {children}
    </CountdownContext.Provider>
  );
}

export { CountdownProvider };
