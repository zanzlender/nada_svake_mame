import { useCallback, useState, useEffect } from "react";

// key - name/id of the object to be saved in storage
// defaultValue -  if the object with the passed key is not found, the default value will be used
export function useLocalStorage(key, defaultValue) {
  return useStorage(key, defaultValue, window.localStorage);
}

export function useSessionStorage(key, defaultValue) {
  return useStorage(key, defaultValue, window.sessionStorage);
}

function useStorage(key, defaultValue, storageObject) {
  const [value, setValue] = useState(() => {
    const jsonValue = storageObject.getItem(key);

    if (jsonValue != null) return JSON.parse(jsonValue);

    if (typeof initialValue === "function") {
      return defaultValue();
    } else {
      return defaultValue;
    }
  });

  useEffect(() => {
    if (value === undefined) return storageObject.removeItem(key);
    storageObject.setItem(key, JSON.stringify(value));
  }, [key, value, storageObject]);

  const remove = useCallback(() => {
    setValue(undefined);
  }, []);

  return [value, setValue, remove];
}

// -------------------------------------------------------> USAGE <-------------------------------------------------------------
/* 
    const [name, setName, removeName] = useSessionStorage("name", "Kyle");
    const [age, setAge, removeAge] = useLocalStorage("age", 26);

    <button onCLick={removeName}>Delete user from storage</button>
*/

// -------------------------------------------------------> INFORMATION <-------------------------------------------------------
// This hook saves the passed key, value pair into session storage or local storage.
// If there is nothing found in the storage it will set that key, value pair into storage.
// remove - removes the value from the object
