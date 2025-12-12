import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { SchoolGrade } from "@/features/matches";
import { PSK } from "@/lib/constants";

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
      name: PSK.SCHOOL_GRADE_STORAGE,
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export { useSchoolGradeStore };
