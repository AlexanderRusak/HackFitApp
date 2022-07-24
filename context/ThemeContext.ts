import { createContext } from 'react';

export type ThemeColor = {
  themeColor: string,
  setThemeColor: React.Dispatch<React.SetStateAction<string>>
}

export const ThemeContext = createContext<ThemeColor>(null as unknown as ThemeColor)