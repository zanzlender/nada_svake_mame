import { useState, useCallback } from 'react';
import useUpdateEffect from './useUpdateEffect';

// validationFunction - function to validate the state
// initialValue - the initial value of the state
export default function useStateWithValidation(
  validationFunction,
  initialValue
) {
  const [state, setstate] = useState(initialValue);
  const [isValid, setIsValid] = useState(null);

  useUpdateEffect(() => {
    setIsValid(validationFunction(state));
  }, [state]);

  const onChange = useCallback(
    nextState => {
      const value =
        typeof nextState === 'function' ? nextState(state) : nextState;

      setstate(value);
      setIsValid(validationFunction(value));
    },
    [validationFunction]
  );

  return [state, onChange, isValid];
}

// -------------------------------------------------------> USAGE <-------------------------------------------------------------
/* i
    const [username, setUsername, isValid] = useStateWithValidation(
        name => name.length > 5,
        ""
    )
*/

// -------------------------------------------------------> INFORMATION <-------------------------------------------------------
// This hook behaves similarly to a normal useState, but it allows us to pass a validation function
// for that state, and each time the state changes it is also validated.

// state - current value of the state
// onChange - behaves like a setState()
// isValid - true/false depending on whether the state is valid or not
