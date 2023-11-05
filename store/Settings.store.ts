import { metadata } from "./../app/layout";
import { persist } from "zustand/middleware";
import { create } from "zustand";

interface SettingsState {
  autoSave: boolean;
  wordWrap: boolean;
  htmlClasses: string;
  theme: string;
  fontSize: number;
  metatags: {
    title: string;
    description: string;
  };
  setAutoSave: (value: boolean) => void;
  setWordWrap: (value: boolean) => void;
  setHtmlClasses: (value: string) => void;
  setTheme: (value: string) => void;
  setMetaTags: (value: string, key: string) => void;
  setfontSize: (value: number) => void;
  IncrementfontSize: (value: number) => void;
  DecrementfontSize: (value: number) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      autoSave: true,
      wordWrap: false,
      htmlClasses: "html ",
      theme: "",
      metatags: {
        title: "My Code",
        description: "My code using codepen",
      },
      fontSize: 20,
      setAutoSave: (value) => set({ autoSave: value }),
      setHtmlClasses: (value) => set({ htmlClasses: value }),
      setWordWrap: (value) => set({ wordWrap: value }),
      setTheme: (value) => set({ theme: value }),
      setfontSize: (value) => set({ fontSize: value }),
      IncrementfontSize: (value) =>
        set((prev) => ({ fontSize: prev.fontSize + value })),
      DecrementfontSize: (value) =>
        set((prev) => ({ fontSize: prev.fontSize - value })),
      setMetaTags: (value, key) =>
        set((prev) => ({
          metatags: {
            ...prev.metatags,
            [key]: value,
          },
        })),
    }),
    {
      name: "settings-storage",
      partialize: (state) =>
        Object.fromEntries(
          Object.entries(state).filter(
            ([key]) => !["metatags", "htmlClasses"].includes(key)
          )
        ),
    }
  )
);
