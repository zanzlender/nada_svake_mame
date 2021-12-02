import { useCallback, useRef, useState } from 'react';

// defaultValue - initial value of the state
// capacity - number of states that will be saved in history, default is 10
export default function useStateWithHistory(
  defaultValue,
  { capacity = 10 } = {}
) {
  const [value, setValue] = useState(defaultValue);
  const historyRef = useRef([value]);
  const pointerRef = useRef(0);

  const set = useCallback(
    v => {
      const resolvedValue = typeof v === 'function' ? v(value) : v;

      if (historyRef.current[pointerRef.current] !== resolvedValue) {
        if (pointerRef.current < historyRef.current.length - 1) {
          historyRef.current.splice(pointerRef.current + 1);
        }
        historyRef.current.push(resolvedValue);

        while (historyRef.current.length > capacity) {
          historyRef.current.shift();
        }
        pointerRef.current = historyRef.current.length - 1;
      }
      setValue(resolvedValue);
    },
    [capacity, value]
  );

  const back = useCallback(() => {
    if (pointerRef.current <= 0) return;
    pointerRef.current--;
    setValue(historyRef.current[pointerRef.current]);
  }, []);

  const forward = useCallback(() => {
    if (pointerRef.current >= historyRef.current.length - 1) return;
    pointerRef.current++;
    setValue(historyRef.current[pointerRef.current]);
  }, []);

  const go = useCallback(index => {
    if (index < 0 || index >= historyRef.current.length - 1) return;
    pointerRef.current = index;
    setValue(historyRef.current[pointerRef.current]);
  }, []);

  return [
    value,
    set,
    {
      history: historyRef.current,
      pointer: pointerRef.current,
      back,
      forward,
      go
    }
  ];
}

// -------------------------------------------------------> USAGE <-------------------------------------------------------------
/* 
    const [count, setCount, { history, pointer, back, forward, go }] =
        useStateWithHistory(1);
*/

// -------------------------------------------------------> INFORMATION <-------------------------------------------------------
// This hook behaves similiarly to useState(), however it also save the history of changes made into an array.

// pointer - index of the state in the arary
// go(index) go to that state history in the index
// back - previous state
// forward - next state

// ! after it has reached it's capacity, it cannot be changed anymore.
