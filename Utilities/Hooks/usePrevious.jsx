import { useRef } from 'react';

// value - the state to be tracked
export default function usePrevious(value) {
  const currentRef = useRef(value);
  const previousRef = useRef();

  if (currentRef.current !== value) {
    previousRef.current = currentRef.current;
    currentRef.current = value;
  }

  return previousRef.current;
}

// -------------------------------------------------------> USAGE <-------------------------------------------------------------
/* 
    const [count, setCount] = useState(false);
    
    const previousCount = usePrevious(count);
*/

// -------------------------------------------------------> INFORMATION <-------------------------------------------------------
// This hook is used whenever we need to store the previous value of a state.
