import { useState } from 'react';

// defaultValue - the starting value of the array
export default function useArray(defaultValue: Array<any>) {
  const [array, setArray] = useState(defaultValue);

  function push(element: any) {
    setArray(a => [...a, element]);
  }

  function filter(callback) {
    setArray(a => a.filter(callback));
  }

  function update(index, newElement) {
    setArray(a => [
      ...a.slice(0, index),
      newElement,
      ...a.slice(index + 1, a.length - 1)
    ]);
  }

  function remove(index) {
    setArray(a => [...a.slice(0, index), ...a.slice(index + 1, a.length - 1)]);
  }

  function clear() {
    setArray([]);
  }

  return { array, set: setArray, push, filter, update, remove, clear };
}

// -------------------------------------------------------------------> USAGE <--------------------------------------------------------------
/*  
    const {array, set, push, remove, filter, update, clear} = useArray([ 1, 2, 3, 4, 5, 6])

    {() => push(7)}, 
    {() => update(1, 9)}, 
    {() => remove(1)}, 
    {() => filter(n => n < 3)}, 
    {() => set([1, 2]}, 
    {clear}
*/
// push - add new element to the array
// update - changes element at index x to value y
// remove - remove index x from array
// filter - keep value in array based on condition
// set - overrides the array
// clear - deletes the entire array

// -----------------------------------------------------------------> INFORMATION <----------------------------------------------------------
// This custom hooks makes working with array easier. Instead of writing all code, we used the given methods.
