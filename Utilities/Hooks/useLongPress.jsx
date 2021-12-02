import useEventListener from './useEventListener';
import useEffectOnce from './useEffectOnce';
import useTimeout from './useTimeout';

// ref - reference to the element to watch for long press
// callback - function to be executed when long press is detected
// delay - how long the user has to hold press to activate the function (default is 250 miliseconds)
export default function useLongPress(ref, callback, { delay = 250 } = {}) {
  const { reset, clear } = useTimeout(callback, delay);
  useEffectOnce(clear);

  useEventListener('mousedown', reset, ref.current);
  useEventListener('touchstart', reset, ref.current);

  useEventListener('mouseup', clear, ref.current);
  useEventListener('mouseleave', clear, ref.current);
  useEventListener('touchend', clear, ref.current);
}

// -------------------------------------------------------> USAGE <-------------------------------------------------------------
/* 
    const elementRef = useRef();

    useLongPress(elementRef, () => alert("Long press"));
*/

// -------------------------------------------------------> INFORMATION <-------------------------------------------------------
// This hook is used for detecting a long press / press and hold click.
// After long press is detected it will execute the given callback function.
