import { useState, useEffect } from "react";

const get = () => {
  if (typeof window === "undefined") return { isSmall: false, isMobile: false, isTablet: false, width: 1280 };
  const w = window.innerWidth;
  return {
    isSmall:  w < 480,
    isMobile: w < 768,
    isTablet: w >= 768 && w < 1024,
    width:    w,
  };
};

export function useBreakpoint() {
  const [bp, setBp] = useState(get);
  useEffect(() => {
    const handler = () => setBp(get());
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return bp;
}
