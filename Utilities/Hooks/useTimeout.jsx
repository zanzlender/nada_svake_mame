import { useCallback, useEffect, useRef } from 'react';

// callback - function to be called after some delay
// delay - number of miliseconds to wait before executing the function
export default function useTimeout(callback, delay) {
  const callbackRef = useRef(callback); // makes it possible to persist state of delay even when rerendering
  const timeoutRef = useRef();

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const set = useCallback(() => {
    timeoutRef.current = setTimeout(() => callbackRef.current(), delay);
  }, [delay]);

  const clear = useCallback(() => {
    timeoutRef.current && clearTimeout(timeoutRef.current);
  }, []);

  useEffect(() => {
    set();
    return clear;
  }, [delay, set, clear]);

  const reset = useCallback(() => {
    clear();
    set();
  }, [clear, set]);

  return { reset, clear };
}

// ------------------------------------------------------------------------> USAGE <-----------------------------------------------------------------------------------
/*
    const [count, setCount] = useState(10);
    const { clear, reset } = useTimeout(() => setCount(0), 1000) --> set the state of count to 0, after 1 second

    <button onClick={clear}>Clear (stop) the countdown</button>  --> stops the countdow, the function will not execute after that
    <button onClick={reset}>Reset the counter to 0</button>  --> countdown will be reset, meaning that after the delay it will execute
*/
// -----------------------------------------------------------------------> INFORMATION <------------------------------------------------------------------------------
// This hook executes the passed callback function after some delay (timeout in miliseconds).

// reset - resets the countdown, the function will run after the delay
// clear - removes the countdown (stops it), the function will not run again
