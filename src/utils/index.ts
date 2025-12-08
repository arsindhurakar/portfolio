import { useState, useEffect } from "react";

/**
 * Hook to detect if the screen width is less than a given breakpoint (default 640px)
 */
export const useIsSmallScreen = (breakpoint = 640) => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth < breakpoint);

    handleResize(); // initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return isSmallScreen;
};
