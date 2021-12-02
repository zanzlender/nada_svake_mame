/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from 'react';

// callback - function to be executed
// dependancies - array of states, same as in a useEffect, when they change the function triggers
export default function useUpdateEffect(callback, dependencies) {
  const firstRenderRef = useRef(true);

  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      return;
    }
    return callback();
  }, dependencies);
}

// -------------------------------------------------------> USAGE <-------------------------------------------------------------
/*
    const [count, setCount] = useState(10);

    useUpdateEffect(() => alert(count), [count]) 
*/

// -------------------------------------------------------> INFORMATION <-------------------------------------------------------
// useEffect hook triggers on render and every subsequent change, but this cutom hook disables that.
// It will run when the state actually changes for the first time, and not on render.
