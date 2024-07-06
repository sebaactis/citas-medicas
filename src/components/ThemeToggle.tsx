import { useEffect, useState } from 'react';
import { Switch } from './ui/switch';
import useThemeStore from "@/stores/themeStore"

const ThemeToggle: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const { switchTheme } = useThemeStore();

  useEffect(() => {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    switchTheme();
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
      <Switch checked={isDarkMode} onClick={toggleDarkMode} id="airplane-mode" />
  );
};

export default ThemeToggle;