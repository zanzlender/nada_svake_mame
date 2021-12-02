/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react';
import useEventListener from './useEventListener';

export default function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEventListener('resize', () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight
    });
  });

  return windowSize;
}

// -------------------------------------------------------> USAGE <-------------------------------------------------------------
/*
    const { width, height } = useWindowSize();
*/

// -------------------------------------------------------> INFORMATION <-------------------------------------------------------
// This hook returns the current width and height of the window.
// State is updated on screen resize.
