import { useEffect, useState } from 'react';
import useEventListener from './useEventListener';

// mediaQuery - media query to test, in the format of "(min-width: 500px)"
export default function useMediaQuery(mediaQuery) {
  const [isMatch, setIsMatch] = useState(null);
  const [mediaQueryList, setMediaQueryList] = useState(null);

  useEffect(() => {
    const list = window.matchMedia(mediaQuery);
    setMediaQueryList(list);
    setIsMatch(list.matches);
  }, [mediaQuery]);

  useEventListener('change', e => setIsMatch(e.matches), mediaQueryList);

  return isMatch;
}

//----------------------------------------------> USAGE <------------------------------------------------------------------
/*
    const isLarge = useMediaQuery("(min-width: 200px)")
*/

//---------------------------------------------> INFORMATION <------------------------------------------------------------
// This hook will check a media query for the current screen, and return true/false if it matches or not.
// This hook will also listen to any changes made, like resizing the window, and send the appropriate response.
