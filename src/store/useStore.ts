import { create } from 'zustand';

interface AppState {
  isAuthenticated: boolean;
  user: { name: string; role: string } | null;
  darkMode: boolean;
  login: (code: string) => void;
  logout: () => void;
  toggleDarkMode: () => void;
}

export const useStore = create<AppState>((set) => ({
  isAuthenticated: false,
  user: null,
  darkMode: false,
  login: (code: string) => {
    // any 6-digit code works
    if (code.length === 6) {
      set({ isAuthenticated: true, user: { name: 'Officer Singh', role: 'Welfare Officer' } });
    }
  },
  logout: () => set({ isAuthenticated: false, user: null }),
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
}));
