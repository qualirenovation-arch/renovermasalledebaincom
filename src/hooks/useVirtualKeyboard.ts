import { useEffect } from "react";

/**
 * Detects when the virtual keyboard is open on mobile
 * and adds a class to <body> so CSS can unstick the header.
 */
export function useVirtualKeyboard() {
  useEffect(() => {
    // Use visualViewport API (supported on modern mobile browsers)
    const vv = window.visualViewport;
    if (!vv) return;

    let isKeyboardOpen = false;

    const onResize = () => {
      // If the visual viewport height is significantly smaller than window height,
      // the virtual keyboard is likely open
      const heightDiff = window.innerHeight - vv.height;
      const keyboardOpen = heightDiff > 150;

      if (keyboardOpen && !isKeyboardOpen) {
        isKeyboardOpen = true;
        document.body.classList.add("keyboard-open");
      } else if (!keyboardOpen && isKeyboardOpen) {
        isKeyboardOpen = false;
        document.body.classList.remove("keyboard-open");
      }
    };

    vv.addEventListener("resize", onResize);
    return () => {
      vv.removeEventListener("resize", onResize);
      document.body.classList.remove("keyboard-open");
    };
  }, []);
}
