import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  getThemeMode,
  setThemeMode as saveThemeMode,
  getAccentColor,
  setAccentColor as saveAccentColor,
} from '../utils/storage';

const ThemeContext = createContext();

export const ACCENT_COLORS = [
  { key: 'blue', label: 'Blue', hex: '#3B82F6' },
  { key: 'purple', label: 'Purple', hex: '#A855F7' },
  { key: 'green', label: 'Green', hex: '#10B981' },
  { key: 'pink', label: 'Pink', hex: '#EC4899' },
  { key: 'orange', label: 'Orange', hex: '#F97316' },
];

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState(() => getThemeMode());
  const [accent, setAccent] = useState(() => getAccentColor());

  // Resolve effective theme (handle 'auto')
  const resolvedMode = useCallback(() => {
    if (mode === 'auto') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return mode;
  }, [mode]);

  // Apply theme to DOM
  useEffect(() => {
    const effectiveMode = resolvedMode();
    document.documentElement.setAttribute('data-theme', effectiveMode);
    document.documentElement.setAttribute('data-accent', accent);

    // Update meta theme-color
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) {
      const colorObj = ACCENT_COLORS.find((c) => c.key === accent);
      metaTheme.setAttribute('content', colorObj ? colorObj.hex : '#3B82F6');
    }
  }, [mode, accent, resolvedMode]);

  // Listen for system theme changes when mode is 'auto'
  useEffect(() => {
    if (mode !== 'auto') return;

    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => {
      document.documentElement.setAttribute('data-theme', mql.matches ? 'dark' : 'light');
    };
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, [mode]);

  const changeMode = (newMode) => {
    setMode(newMode);
    saveThemeMode(newMode);
  };

  const changeAccent = (newAccent) => {
    setAccent(newAccent);
    saveAccentColor(newAccent);
  };

  return (
    <ThemeContext.Provider
      value={{
        mode,
        accent,
        resolvedMode: resolvedMode(),
        changeMode,
        changeAccent,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
};
