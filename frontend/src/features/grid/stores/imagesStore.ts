import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { ImageItem } from "../images";

type ImagesState = {
  applyGrayscale: boolean;
  images: ImageItem[];
  setApplyGrayscale: (value: boolean) => void;
  setImages: (value: ImageItem[]) => void;
};

const useImagesStore = create<ImagesState>()(
  persist(
    (set) => ({
      applyGrayscale: false,
      images: [],
      setApplyGrayscale: (value: boolean) => set({ applyGrayscale: value }),
      setImages: (value: ImageItem[]) => set({ images: value }),
    }),
    {
      name: "images-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
export { useImagesStore };
