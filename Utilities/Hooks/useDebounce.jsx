/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import useTimeout from './useTimeout';

// callback - function to be executed on
// delay - delay after which to execute the function
// dependancies - dependancies which restart the delay timer
export default function useDebounce(callback, delay, dependencies) {
  const { reset, clear } = useTimeout(callback, delay);
  useEffect(reset, [...dependencies, reset]);
  useEffect(clear, []);
}

// ----------------------------------------------------------> USAGE <----------------------------------------------------------------
/*
    const [search, setSearch] = useState(10);

    useDebounce(() => {
      QUERY DATABSE FOR search
    }, 1000, [search])        // if count doesn't change for one second (1000 miliseconds), run function

    const handleType = (e) => {
      setSearch(e.target.value);
    }

    return (
      <input type="text" onChange={handleType}/>
    )
*/

// ----------------------------------------------------------> INFORMATION <--------------------------------------------------------
// We use this custom component when we want to run some function after some delay,
// but depending on a state(s).
// * EXAMPLE: after typing, wait for one second then do an automatic query. (insted of on each key pressed)
