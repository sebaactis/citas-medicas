import { create } from 'zustand'

interface ThemeState {
    darkMode: boolean;
    switchTheme: () => void;
  }

const themeStore = create<ThemeState>((set) => ({
    darkMode: false,
    switchTheme: () => set((state: any) => ({ darkMode: !state.darkMode }))
}))

export default themeStore;