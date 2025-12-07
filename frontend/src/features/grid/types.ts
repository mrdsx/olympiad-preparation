type SchoolGrade = "2" | "2_4" | "3_4" | "5_6" | "5_11" | "7_11";

type StringGridLayout = "3x4" | "4x4" | "4x6" | "5x6";

type GridLayout = {
  columns: 4 | 5;
  rows: 4 | 6;
  string: StringGridLayout;
};

export type { GridLayout, SchoolGrade, StringGridLayout };
