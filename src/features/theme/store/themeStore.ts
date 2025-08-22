import { create } from "zustand";

type ThemeStore = {
  isDarkMode: boolean;
  setIsDarkMode: (value: boolean) => void;
};

export const useThemeStore = create<ThemeStore>((set) => ({
  isDarkMode: true,
  setIsDarkMode: (value: boolean) => set({ isDarkMode: value }),
}));
