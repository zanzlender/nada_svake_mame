import { useMediaQuery } from './useMediaQuery';
import { useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';

export default function useDarkMode() {
  const [darkMode, setDarkMode] = useLocalStorage('useDarkMode');
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const enabled = darkMode ?? prefersDarkMode;

  useEffect(() => {
    document.body.classList.toggle('dark-mode', enabled);
  }, [enabled]);

  return [enabled, setDarkMode];
}

// -------------------------------------> USAGE <--------------------------------------------------
// * look at tailwind css documentation to see how they implemented dark mode!
/*
    const [darkMode, setDarkMode] = useDarkMode();

    onClick(() => setDarkMode(currentMode => !currentMode))
*/
// -------------------------------------> INFORMATION <---------------------------------------------
// This custom react hook enables/disables dark mode on the entire website (application).
// It uses previous build custom hooks [useMediaQuery, useLocalStorage]
// ! this hook only works for dark/light mode, if you want more themes you need to implement it differently
