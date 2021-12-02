import { useRef, useEffect } from 'react';
import useRenderCount from './useRenderCount';

// componentName
// props - props which it should monitor
export default function useDebugInformation(componentName, props) {
  const count = useRenderCount();
  const changedProps = useRef({});
  const previousProps = useRef(props);
  const lastRenderTimestamp = useRef(Date.now());

  const propKeys = Object.keys({ ...props, ...previousProps });

  changedProps.current = propKeys.reduce((obj, key) => {
    if (props[key] === previousProps.current[key]) return obj;

    return {
      ...obj,
      [key]: { previous: previousProps.current[key], current: props[key] }
    };
  }, []);

  const info = {
    count,
    changedProps: changedProps.current,
    timeSinceLastRender: Date.now() - lastRenderTimestamp.current,
    lastRenderTimestamp: lastRenderTimestamp.current
  };

  useEffect(() => {
    previousProps.current = props;
    lastRenderTimestamp.current = Date.now();
    console.log('[debug-info] ', componentName, info);
  });
}

// -------------------------------------------------------> USAGE <-------------------------------------------------------------
/* 
    const SomeComponent = ({ props }) => {
        useDebugInformation("SomeComponent", props)
    }
*/

// -------------------------------------------------------> INFORMATION <-------------------------------------------------------
// This hook is used for debugging a component. We pass in the name of that component, and the props to be monitored.
// On any change this hook will return info about that component, and also write to the console!
// Returns the current states, the previous states, render timestamps and render count.
// ! best to read in the browsers console
