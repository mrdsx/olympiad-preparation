import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { PSK } from "@/lib/constants";

import type { GridSize, StringGridLayout } from "../types";

type GridLayoutState = {
  gridSize: GridSize;
  setGridSize: (value: StringGridLayout) => void;
};

const useGridSizeStore = create<GridLayoutState>()(
  persist(
    (set) => ({
      gridSize: { columns: 4, rows: 4, string: "4x4" },
      setGridSize: (value: StringGridLayout) => {
        const gridLayout = value.split("x");
        const columns = Number(gridLayout[0]) as 4 | 5;
        const rows = Number(gridLayout[1]) as 4 | 6;

        set({ gridSize: { columns, rows, string: value } });
      },
    }),
    {
      name: PSK.GRID_LAYOUT_STORAGE,
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export { useGridSizeStore };
