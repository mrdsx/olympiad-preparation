import { createContext, useContext } from "react";

import {
  type GridSettingsContextType,
  useGridSettingsContext,
} from "./useGridSettingsContext";

const GridSettingsContextType = createContext<GridSettingsContextType | null>(
  null,
);

function GridSettingsProvider({ children }: React.PropsWithChildren) {
  const contextValue = useGridSettingsContext();

  return (
    <GridSettingsContextType.Provider value={contextValue}>
      {children}
    </GridSettingsContextType.Provider>
  );
}

function useGridSettings() {
  const context = useContext(GridSettingsContextType);
  if (context === null) {
    throw new Error("useGridSettings must be used inside GridSettingsProvider");
  }

  return context;
}

export { GridSettingsProvider, useGridSettings }; // eslint-disable-line
