import * as React from 'react';

type Theme = 'dark' | 'light';

interface ThemeProviderState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const STORAGE_KEY = 'resume-theme';

const ThemeProviderContext = React.createContext<ThemeProviderState | undefined>(undefined);

function getPreferredTheme(): Theme {
  if (typeof window === 'undefined') return 'dark';
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === 'dark' || stored === 'light') return stored;
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

export interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
}

/**
 * Applies the `.dark` / (default light) class to <html> and persists the
 * user's choice. Mounted once by the shell; every federated remote reads
 * the same `.dark` class via the shared Tailwind theme tokens, so no
 * remote needs its own provider.
 */
export function ThemeProvider({ children, defaultTheme }: ThemeProviderProps) {
  const [theme, setThemeState] = React.useState<Theme>(() => defaultTheme ?? getPreferredTheme());

  React.useEffect(() => {
    const root = window.document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    root.style.colorScheme = theme;
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const setTheme = React.useCallback((next: Theme) => setThemeState(next), []);
  const toggleTheme = React.useCallback(
    () => setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark')),
    [],
  );

  const value = React.useMemo(
    () => ({ theme, setTheme, toggleTheme }),
    [theme, setTheme, toggleTheme],
  );

  return <ThemeProviderContext.Provider value={value}>{children}</ThemeProviderContext.Provider>;
}

export function useTheme() {
  const context = React.useContext(ThemeProviderContext);
  if (!context) {
    throw new Error('useTheme must be used within a <ThemeProvider>');
  }
  return context;
}
