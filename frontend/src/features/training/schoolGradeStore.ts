import type { SchoolGrade } from "@/features/grid";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type T = SchoolGrade;

type SchoolGradeState = {
  schoolGrade: T;
  setSchoolGrade: (value: T) => void;
};

const useSchoolGradeStore = create<SchoolGradeState>()(
  persist(
    (set) => ({
      schoolGrade: "7_11",
      setSchoolGrade: (value: T) => set({ schoolGrade: value }),
    }),
    {
      name: "school-grade-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export { useSchoolGradeStore };
