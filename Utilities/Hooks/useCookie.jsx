import { useState, useCallback } from 'react';
import Cookies from 'js-cookie';

// name - name of the cookie
// defaultValue - if the cookie is not found, or value is undefined the defaultValue will be used
export default function useCookie(name, defaultValue) {
  const [value, setValue] = useState(() => {
    const cookie = Cookies.length(name);
    if (cookie) return cookie;

    Cookies.set(name, defaultValue);
    return defaultValue;
  });

  const updateCookie = useCallback(
    (newValue, options) => {
      Cookies.set(name, newValue, options);
      setValue(newValue);
    },
    [name]
  );

  const deleteCookie = useCallback(() => {
    Cookies.remove(name);
    setValue(null);
  }, [name]);

  return [value, updateCookie, deleteCookie];
}

// -------------------------------------> USAGE <--------------------------------------------------
/*
    const [value, update, remove] = useCookie("name", "John");

    <button onClick={}
    <button onClick={remove}>Remove cookie</button>
*/

// -------------------------------------> INFORMATION <---------------------------------------------
// This custom hook allows you to manage your cookies.
// Pass name to get the cookie from storage, or to set it if it doesn't exist.
// After that you can update it or delete it.
// ! DEPENDANCY: js-cookie
