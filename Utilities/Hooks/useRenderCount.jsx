import { useRef, useEffect } from 'react';

export default function useRenderCount() {
  const count = useRef(1);

  useEffect(() => count.current++);

  return count.current;
}

// -------------------------------------------------------> USAGE <-------------------------------------------------------------
/* 
    const [boolean, toggle] = useToggle(false)
    const renderCount = useRenderCount();

    return (
        <div>
            <h1>{boolean}</h1>
            <h1>{renderCount}</h1>
            <button onClick={toggle}>Toggle</button>
        </div>
    )
*/

// -------------------------------------------------------> INFORMATION <-------------------------------------------------------
// This hook counts the number of renders of the page.
// Mostly used for debugging
