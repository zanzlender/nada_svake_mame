import { useState, useEffect } from 'react';

export default function useGeolocation() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [data, setData] = useState();

  useEffect(() => {
    const successHandler = e => {
      setLoading(false);
      setError(null);
      setData(e.coords);
    };

    const errorHandler = e => {
      setError(e);
      setLoading(false);
    };

    navigator.geolocation.getCurrentPosition(
      successHandler,
      errorHandler,
      options
    );

    const id = navigator.geolocation.watchPosition(
      successHandler,
      errorHandler,
      options
    );

    return () => navigator.geolocation.clearWatch(id);
  }, [options]);

  return { loading, error, data };
}

// -------------------------------------------------------> USAGE <-------------------------------------------------------------
/* 
  const { loading, error, data: { latitude, longitude } } = useGeolocation();
*/

// -------------------------------------------------------> INFORMATION <-------------------------------------------------------
// This hook returns the current position of the user, and then watches for changes.
