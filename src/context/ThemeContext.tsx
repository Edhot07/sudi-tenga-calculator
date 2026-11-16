import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors, ColorTheme } from '@/constants/theme';

export type ThemeMode = 'dark' | 'light';

export interface ThemeContextValue {
  mode: ThemeMode;
  isDark: boolean;
  theme: ColorTheme;
  toggleTheme: () => void;
  setMode: (mode: ThemeMode) => void;
}

const THEME_STORAGE_KEY = 'sudiTengaThemeMode';

const ThemeContext = createContext<ThemeContextValue>({
  mode: 'dark',
  isDark: true,
  theme: Colors.dark,
  toggleTheme: () => {},
  setMode: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>('dark');

  useEffect(() => {
    let isMounted = true;
    async function loadSavedTheme() {
      try {
        const saved = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        if (isMounted && (saved === 'light' || saved === 'dark')) {
          setModeState(saved);
        }
      } catch (e) {
        console.error('Failed to load theme preference:', e);
      }
    }
    loadSavedTheme();

    return () => {
      isMounted = false;
    };
  }, []);

  const setMode = async (newMode: ThemeMode) => {
    setModeState(newMode);
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, newMode);
    } catch (e) {
      console.error('Failed to save theme preference:', e);
    }
  };

  const toggleTheme = () => {
    const nextMode = mode === 'dark' ? 'light' : 'dark';
    setMode(nextMode);
  };

  const isDark = mode === 'dark';
  const theme: ColorTheme = isDark ? Colors.dark : Colors.light;

  return (
    <ThemeContext.Provider
      value={{
        mode,
        isDark,
        theme,
        toggleTheme,
        setMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useAppTheme(): ThemeContextValue {
  return useContext(ThemeContext);
}

