import { useEffect } from 'react';

// callback - function to be executed
export default function useEffectOnce(callback) {
  useEffect(callback, []);
}

// -------------------------------------------------------> USAGE <-------------------------------------------------------------
/*
    const [count, setCount] = useState(0);

    useEffectOnce(() => {
        alert("Hi");
    })
*/

// -------------------------------------------------------> INFORMATION <-------------------------------------------------------
// This hook will run the passed effect only once, on mount. Just for quicker writing.
