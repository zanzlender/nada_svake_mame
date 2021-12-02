import { useCallback, useRef, useState } from 'react';

// callback - function to be executed after the async part finished
// dependancies - list of dependancies based on some state (recalls the function)
export default function useAsync(callback, dependencies = []) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [value, setValue] = useState();

  const callbackMemoized = useCallback(() => {
    setLoading(true);
    setError(undefined);
    setValue(undefined);
    callback()
      .then(setValue)
      .catch(setError)
      .finally(() => setLoading(false));
  }, dependencies);

  useEffect(() => {
    callbackMemoized;
  }, [callbackMemoized]);

  return [loading, error, value];
}

// -------------------------------------------------------> USAGE <-------------------------------------------------------------
/* 
    const { loading, error, value } = useAsync(() => {
        return new Promise((resolve, reject) => {
            const success = false;
          
            setTimeout(() => {
                success ? resolve("hi") : reject("Error")
            }, 1000)
        })
    })
*/

// -------------------------------------------------------> INFORMATION <-------------------------------------------------------
// This hook can be used on any async work to be done on the page.
// Returns the state of the async request: whether it is loading, it returned an error,
// or was successful and returned a value
