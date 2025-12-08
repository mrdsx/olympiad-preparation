import { PATH } from "@/lib/constants";
import type { Path } from "@/lib/types";

const DATASET_LINKS: Record<Path, { id: string; title: string }> = {
  [PATH.DATASET.REGION_2_4]: {
    id: "2_4",
    title: "МТ/РТ 2-4 класс",
  },
  [PATH.DATASET.REGION_5_11]: {
    id: "5_11",
    title: "МТ/РТ 5-11 класс",
  },
  [PATH.DATASET.FINAL_3_4]: {
    id: "3_4",
    title: "ФТ 3-4 класс",
  },
  [PATH.DATASET.FINAL_5_6]: {
    id: "5_6",
    title: "ФТ 5-6 класс",
  },
  [PATH.DATASET.FINAL_7_11]: {
    id: "7_11",
    title: "ФТ 7-11 класс",
  },
};

export { DATASET_LINKS };
