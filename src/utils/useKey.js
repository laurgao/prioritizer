import { useEffect, useRef } from "react";

export default function useKey(key, cb) {
    const callbackRef = useRef(cb);

    useEffect(() => {
      callbackRef.current = cb;
    })

    useEffect(() => {
      const handleKeyPress = (e) => {
        if(e.code === key) {
          callbackRef.current(e)
        }
      }

      document.addEventListener("keydown", handleKeyPress)
      return () => document.removeEventListener("keypress", handleKeyPress)
    }, [key])
}

const waitForEl = (selector) => {        
    const input = document.getElementById(selector);
    if (input) {
        input.focus();
        // input.select();
    } else {
        setTimeout(function() {
            waitForEl(selector);
        }, 100);
    }
};

export {waitForEl}