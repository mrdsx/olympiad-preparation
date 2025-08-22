import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { ImageItem } from "../images";

type ImagesState = {
  images: ImageItem[];
  setImages: (value: ImageItem[]) => void;
};

const useImagesStore = create<ImagesState>()(
  persist(
    (set) => ({
      images: [],
      setImages: (value: ImageItem[]) => set({ images: value }),
    }),
    {
      name: "images-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
export { useImagesStore };
