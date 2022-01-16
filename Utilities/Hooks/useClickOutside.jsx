import useEventListener from "./useEventListener";

// ref - reference to the object (modal) to watch
// callback - function to be executed after touchOutside is detected
export default function useClickOutside(ref, callback) {
  useEventListener(
    "click",
    (e) => {
      if (ref.current == null || ref.current.contains(e.target)) return;
      callback(e);
    },
    document
  );
}

// -------------------------------------------------------> USAGE <-------------------------------------------------------------
/* 
    const [isOpen, setIsOpen] = useState(true); --> modal is open
    const modalRef = useRef();

    useClickOutside(modalRef, () => {
        if(isOpen) setIsOpen(false);
    })

    return (
        <div ref={ modalRef }>
            ...
        </div>
    )
*/

// -------------------------------------------------------> INFORMATION <-------------------------------------------------------
// This hook is used to close a Modal, whenever we click outisde of it.
// We have to pass the reference to that modal, and a callback function to specify the exact action to close it.
