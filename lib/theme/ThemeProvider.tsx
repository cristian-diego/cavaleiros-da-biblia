import React, { createContext, useContext, useState, useEffect } from 'react';
import { vars } from 'nativewind';

type Theme = 'kid-bible' | 'kid-adventurers';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'kid-bible',
  setTheme: () => {},
});

const themes = {
  'kid-bible': vars({
    '--color-primary': '74 144 226', // Blue
    '--color-secondary': '255 215 0', // Yellow
    '--color-background': '248 249 250',
    '--color-text': '45 55 72',
    '--color-accent': '255 255 255',
  }),
  'kid-adventurers': vars({
    '--color-primary': '107 70 193', // Purple
    '--color-secondary': '255 159 28', // Orange
    '--color-background': '245 245 245',
    '--color-text': '45 55 72',
    '--color-accent': '255 255 255',
  }),
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('kid-bible');

  useEffect(() => {
    // Apply theme styles
    const themeStyles = themes[theme];
    Object.entries(themeStyles).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value);
    });
  }, [theme]);

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}
