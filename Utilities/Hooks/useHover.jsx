import { useState } from 'react';
import useEventListener from './useEventListener';

// ref - reference to the element to watch for hover
export default function useHover(ref) {
  const [hovered, setHovered] = useState(false);

  useEventListener('mouseover', () => setHovered(true), ref.current);
  useEventListener('mouseout', () => setHovered(false), ref.current);

  return hovered;
}

// -------------------------------------------------------> USAGE <-------------------------------------------------------------
/* 
    const elementRef = useRef();
    const hovered = useHover(elementRef)

    return (
        <div 
            ref={elementRef}
            style={{
                backgroundColor: hovered ? "blue" : "red",
            }}
        >
        ...
        </div>
    )
*/

// -------------------------------------------------------> INFORMATION <-------------------------------------------------------
// This hook checks if the user is hovering over a passed element, and returns true/false.
