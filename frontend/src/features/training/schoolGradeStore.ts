import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { SchoolGrade } from "../grid";

type T = SchoolGrade;

type SchoolGradeState = {
  schoolGrade: T;
  setSchoolGrade: (value: T) => void;
};

const useSchoolGradeStore = create<SchoolGradeState>()(
  persist(
    (set) => ({
      schoolGrade: "9_11",
      setSchoolGrade: (value: T) => set({ schoolGrade: value }),
    }),
    {
      name: "school-grade-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export { useSchoolGradeStore };
