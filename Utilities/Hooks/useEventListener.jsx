import { useEffect, useRef } from 'react';

// eventType - name of the event on which to execute
// callback - function to be executed on event
// element - which element should the event listener listen to, on default it is the whole window
export default function useEventListener(
  eventType,
  callback,
  element = window
) {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const handler = e => callbackRef.current(e);
    element.addEventListener(eventType, handler);

    return () => element.removeEventListener(eventType, handler);
  }, [eventType, element]);
}

// ---------------------------------------> USAGE <--------------------------------------------------------
/* 
    const [key, setKey] = useState("");

    useEventListener('mousedown', event => {
        setKey(e.key)
    }
 */
// ---------------------------------------> INFORMATION <--------------------------------------------------
// This hook adds and cleans up an event listener for our components
