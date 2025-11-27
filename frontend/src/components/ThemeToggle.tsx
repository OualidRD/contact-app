import { Moon, Sun } from 'lucide-react';
import { useThemeStore } from '../store';
import { useEffect } from 'react';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useThemeStore();

  useEffect(() => {
    // Mettre à jour le DOM quand le thème change
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-yellow-400 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
      aria-label="Basculer le thème"
    >
      {theme === 'light' ? (
        <Moon className="w-5 h-5" />
      ) : (
        <Sun className="w-5 h-5" />
      )}
    </button>
  );
};
