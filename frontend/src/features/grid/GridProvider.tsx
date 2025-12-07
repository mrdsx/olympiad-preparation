import { createContext, useContext } from "react";
import {
  useGridContextState,
  type GridContextState,
} from "./useGridContextState";

type GridContextType = GridContextState;

const GridContext = createContext<GridContextType | null>(null);

function GridProvider({ children }: React.PropsWithChildren) {
  const contextValue = useGridContextState();

  return (
    <GridContext.Provider value={contextValue}>{children}</GridContext.Provider>
  );
}

function useGrid() {
  const context = useContext(GridContext);
  if (context === null) {
    throw new Error("useGridOptions must be used inside GridOptionsProvider");
  }

  return context;
}

export { GridProvider, useGrid };
