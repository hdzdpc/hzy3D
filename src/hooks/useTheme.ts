import { useState, useCallback } from 'react';
import type { AppTheme } from '../types';

export const useTheme = () => {
  const [theme, setTheme] = useState<AppTheme>('light');

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  }, []);

  return {
    theme,
    toggleTheme,
  };
};
