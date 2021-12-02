import useAsync from './useAsync';

const DEFAULT_OPTIONS = {
  headers: { 'Content-Type': 'application/json' }
};

// url - URL to execute the fetch on
// options - optional paramters you would add to a normal fetch function
// dependancies
export default function useFetch(url, options = {}, dependencies = []) {
  return useAsync(() => {
    return fetch(url, { ...DEFAULT_OPTIONS, ...options }).then(res => {
      if (res.ok) return res.json();
      return res.json().then(json => Promise.reject(json));
    });
  }, dependencies);
}

// ------------------------------------------------------> USAGE <----------------------------------------------------------------------------
/*
    const url = '*URL TO API*'
    const { loading, error, data } = useFetch(URL, {}, []);

    if (loading) return 'Loading...'
    if (error) return 'Something went wrong'

    return data.map ...
*/
// ------------------------------------------------------> INFORMATION <----------------------------------------------------------------------
// This is a react hook that uses the fetch API, gets a request and
// returns whether it is loading, if an error occured or it got the data.
