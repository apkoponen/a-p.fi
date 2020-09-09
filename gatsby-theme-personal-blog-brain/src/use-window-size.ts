import { useState, useEffect } from "react";

export function useWindowSize() {
  const isClient = typeof window === "object";

  function getSize() {
    return {
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined,
    };
  }

  const [windowSize, setWindowSize] = useState(getSize);

  // @ts-expect-error ts-migrate(2345) FIXME: Type 'false' is not assignable to type 'void | (()... Remove this comment to see the full error message
  useEffect(() => {
    if (!isClient) {
      return false;
    }

    function handleResize() {
      setWindowSize(getSize());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  // Empty array ensures that effect is only run on mount and unmount

  return windowSize;
}
