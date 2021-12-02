import { useState } from 'react';
import copy from 'copy-to-clipboard';

export default function useCopyToClipboard() {
  const [value, setValue] = useState();
  const [success, setSuccess] = useState();

  const copyToClipboard = (text, options) => {
    const result = copy(text, options);
    if (result) setValue(text);
    setSuccess(result);
  };

  return [copyToClipboard, { value, success }];
}

// -------------------------------------> USAGE <--------------------------------------------------
/*
    const [copyToClipboard, { success }] = useCopyToClipboard();

    <button onClick={() => copyToClipboard("This text will be copied!")}>
        { success ? "Copied!" : "Copy text"}
    </button>
    <input type="text" />
*/
// -------------------------------------> INFORMATION <---------------------------------------------
// This custom hook allows you to copy some text into the user's clipboard,
// by activating it on some user action.
// ! DEPENDANCY: copy-to-clipboard
