import { PATH } from "@/lib/constants";
import { createContext, useEffect, useRef } from "react";
import { useLocation } from "react-router";
import { useTrainingStore } from "../training";

const CountdownContext = createContext<null>(null);

function CountdownProvider({ children }: React.PropsWithChildren) {
  const resetTrainingStore = useTrainingStore((state) => state.reset);
  const previousPathnameRef = useRef<string>(null);
  const { pathname } = useLocation();

  useEffect(() => {
    if (previousPathnameRef.current === PATH.MATCHES) resetTrainingStore();
    previousPathnameRef.current = pathname;
  }, [pathname]);

  return (
    <CountdownContext.Provider value={null}>
      {children}
    </CountdownContext.Provider>
  );
}

export { CountdownProvider };
