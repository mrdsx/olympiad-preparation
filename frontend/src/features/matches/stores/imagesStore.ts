import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { PSK } from "@/lib/constants";

import type { ImageItem } from "../types";

type T = ImageItem[];

type ImagesState = {
  applyGrayscale: boolean;
  images: T;
  setApplyGrayscale: (value: boolean) => void;
  setImages: (value: T) => void;
};

const useImagesStore = create<ImagesState>()(
  persist(
    (set) => ({
      applyGrayscale: false,
      images: [],
      setApplyGrayscale: (value: boolean) => set({ applyGrayscale: value }),
      setImages: (value: T) => set({ images: value }),
    }),
    {
      name: PSK.IMAGES_STORAGE,
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
export { useImagesStore };
