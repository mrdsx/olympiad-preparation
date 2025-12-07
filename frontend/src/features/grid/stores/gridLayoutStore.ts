import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { GridLayout, StringGridLayout } from "../types";

type GridLayoutState = {
  gridLayout: GridLayout;
  setGridLayout: (value: StringGridLayout) => void;
};

const useGridLayoutStore = create<GridLayoutState>()(
  persist(
    (set) => ({
      gridLayout: { columns: 4, rows: 4, string: "4x4" },
      setGridLayout: (value: StringGridLayout) => {
        const gridLayout = value.split("x");
        const columns = Number(gridLayout[0]) as 4 | 5;
        const rows = Number(gridLayout[1]) as 4 | 6;

        set({ gridLayout: { columns, rows, string: value } });
      },
    }),
    {
      name: "grid-layout-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export { useGridLayoutStore };
