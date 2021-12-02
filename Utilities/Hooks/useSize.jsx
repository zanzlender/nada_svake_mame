import { useState, useEffect } from 'react';

// ref - reference to the element to be tracked
export default function useSize(ref) {
  const [size, setSize] = useState({});

  useEffect(() => {
    if (ref.current == null) return;

    const observer = new ResizeObserver(([entry]) =>
      setSize(entry.contentRect)
    );
    observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return size;
}

// -------------------------------------------------------> USAGE <-------------------------------------------------------------
/* 
    const ref = useRef();
    const size = useSize(ref);

    return (
        <textarea ref={ ref }></textarea>
    ) 
*/

// -------------------------------------------------------> INFORMATION <-------------------------------------------------------
// This hook returns the size properties of the referenced element passed as a prop.
// It tracks if the element has changed it's size.
