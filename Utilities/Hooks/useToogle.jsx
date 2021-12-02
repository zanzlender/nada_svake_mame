import { useState } from 'react';

// defaultValue - the inital value of the state to be toggled, MUST BE a boolean (true, false)
export default function useToggle(defaultValue) {
  const [value, setValue] = useState(defaultValue);

  function toggleValue(value) {
    setValue(currentValue =>
      typeof value === 'boolean' ? value : !currentValue
    );
  }

  return [value, toggleValue];
}

// -------------------------------------------------------------------> USAGE <---------------------------------------------------------------------
/* 
    const[value, toggleValue] = useToggle(false);

    <div>Current value is: { value }</div>
    <button onClick={toggleValue}
*/

// ------------------------------------------------------------------> INFORMATION <---------------------------------------------------------------
// This hook is used for simplifyng handling toggle states. TRUE - FALSE / ON - OFF
// Value returns the current value of the state, while toggleValue changes it to the other.
