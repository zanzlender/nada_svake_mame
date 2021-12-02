import { useEffect, useRef } from 'react';
import isEqual from 'lodash/fp/isEqual';

// callback - function to be executed
// dependancies - which state/variable should be compared
export default function useDeepCompareEffect(callback, dependencies) {
  const currentDependenciesRef = useRef();

  if (!isEqual(currentDependenciesRef.current, dependencies)) {
    currentDependenciesRef.current = dependencies;
  }

  useEffect(callback, [currentDependenciesRef.current]);
}

// -------------------------------------------------------> USAGE <-------------------------------------------------------------
/* 
    useDeepCompareEffect(() => {
        ... TODO
    }, [dependencies])
*/

// -------------------------------------------------------> INFORMATION <-------------------------------------------------------
// This hook compares the actual values of objects instead of their references, like useEffect does.

// EXAMPLE:
/*
    const [age, setAge] = useState();
    const person = { age: age, name: "Kyle"}

    useEffect(() => {
        setAge(25);
    }, [person])

    useDeepCompareEffect(() => {
        setAge(25);
    }, [person])
*/
// * In this example whenever the page rerenders, it will create a new reference to the person object
// * although the data will be the same, as it has a different loaction in memory, useEffect will see it as a different variable and will run again
// * useDeepCompareEffect, however, will compare the values in the 2 different references, and will only run when it has changed
// * it works as if you used useMemo()
