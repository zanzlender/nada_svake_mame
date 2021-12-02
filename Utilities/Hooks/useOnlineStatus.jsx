import { useState } from 'react';
import useEventListener from './useEventListener';

export default function useOnlineStatus() {
  const [online, setOnline] = useState(navigator.onLine);

  useEventListener('online', () => {
    setOnline(navigator.onLine);
  });

  useEventListener('offline', () => {
    setOnline(navigator.onLine);
  });

  return online;
}

// -------------------------------------------------------> USAGE <-------------------------------------------------------------
/* 
    const isOnline = useOnlineStatus();
*/

// -------------------------------------------------------> INFORMATION <-------------------------------------------------------
// This hook checks the online status of the user, and returns true or false.
