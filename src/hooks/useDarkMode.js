import { useEffect, useState } from 'react';

const useDarkMode = () => {
  const [darkMode, setDarkMode] = useState(() =>
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const toggle = () => setDarkMode((prev) => !prev);

  return { darkMode, toggle };
};

export default useDarkMode;

