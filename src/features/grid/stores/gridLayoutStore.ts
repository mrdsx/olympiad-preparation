import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { GridLayout } from "../types";

type GridLayoutState = {
  gridLayout: GridLayout;
  setGridLayout: (value: "4x4" | "5x6") => void;
};

const useGridLayoutStore = create<GridLayoutState>()(
  persist(
    (set) => ({
      gridLayout: { columns: 4, rows: 4 },
      setGridLayout: (value: "4x4" | "5x6") => {
        const gridLayout = value.split("x");
        const columns = Number(gridLayout[0]) as 4 | 5;
        const rows = Number(gridLayout[1]) as 4 | 6;

        set({ gridLayout: { columns, rows } });
      },
    }),
    {
      name: "grid-layout-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export { useGridLayoutStore };
