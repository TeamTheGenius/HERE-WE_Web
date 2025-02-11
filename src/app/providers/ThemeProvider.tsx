import { PropsWithChildren, useEffect, useState } from 'react';
import { ThemeContext } from '../../shared/contexts/ThemeContext';

export function ThemeProvider({ children }: PropsWithChildren) {
  const getInitialTheme = () => {
    const userTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    return localStorage.getItem('theme') || userTheme;
  };

  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}
