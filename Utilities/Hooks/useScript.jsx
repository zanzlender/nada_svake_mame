/* eslint-disable react-hooks/exhaustive-deps */
import useAsync from './useAsync';

// url - URL to the script to be downloaded and used
export default function useScript(url) {
  return useAsync(() => {
    const script = document.createElement('script');
    script.src = url;
    script.async = true;

    return new Promise((resolve, reject) => {
      script.addEventListener('load', resolve);
      script.addEventListener('error', reject);
      document.body.appendChild(script);
    });
  }, [url]);
}

// -------------------------------------------------------> USAGE <-------------------------------------------------------------
/*
    const { loading, error } = useScript("script_url");

    * use the script functions however they are intended to be used
*/
// -------------------------------------------------------> INFORMATION <-------------------------------------------------------
// This hook is used for dynamically importing a script.
// When it is loaded it will be added to the document and you can use it.
