import { useEffect } from 'react';

// ref - reference to the element to be tracked
// rootMargin - distance of the element to the screen, when to detect it
export default function useOnScreen(ref, rootMargin = '0px') {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (ref.current == null) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin }
    );
    observer.observe(ref.current);

    return () => {
      if (ref.current == null) return;
      observer.unobserve(ref.current);
    };
  }, [ref.current, rootMargin]);

  return isVisible;
}

// ---------------------------------------> USAGE <--------------------------------------------------------
/* 
    const headerRef = useRef();
    const visible = useOnScreen(headerRef, "-100px")

    return (
        <h1 ref={ headerRef }>Some header XYZ</h1>
    )
 */
// ---------------------------------------> INFORMATION <--------------------------------------------------
// This hook checks whether the passed element is on the visible part of the screen
// rootMargin specifies the position of the element relative to the screen
//     * EXAMPLE: "-100px", this hook will trigger when the element 100px above the bottom part of the screen
