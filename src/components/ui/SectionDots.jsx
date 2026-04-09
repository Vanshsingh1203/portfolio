import React from "react";
import { motion } from "framer-motion";
import { NAV } from "../../data";
import { useBreakpoint } from "../../hooks/useBreakpoint";

const SECTIONS = ["hero", ...NAV.map(n => n.toLowerCase())];

export default function SectionDots({ activeSection, theme }) {
  const { isMobile, isTablet } = useBreakpoint();
  if (isMobile || isTablet) return null;

  return (
    <div style={{
      position:      "fixed",
      right:          18,
      top:           "50%",
      transform:     "translateY(-50%)",
      zIndex:         90,
      display:       "flex",
      flexDirection: "column",
      gap:            10,
      alignItems:    "center",
    }}>
      {SECTIONS.map(s => {
        const isActive = activeSection === s || (s === "hero" && activeSection === "");
        return (
          <motion.button
            key={s}
            title={s.charAt(0).toUpperCase() + s.slice(1)}
            onClick={() => document.getElementById(s)?.scrollIntoView({ behavior: "smooth" })}
            animate={{ scale: isActive ? 1.25 : 1 }}
            whileHover={{ scale: 1.6 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            style={{
              width:       isActive ? 9 : 7,
              height:      isActive ? 9 : 7,
              borderRadius: "50%",
              border:      `1.5px solid ${isActive ? "#ff4757" : theme.border}`,
              background:   isActive ? "#ff4757" : "transparent",
              cursor:      "pointer",
              padding:      0,
              boxShadow:    isActive ? "0 0 8px #ff475780" : "none",
              transition:  "width 0.25s, height 0.25s, background 0.25s, border-color 0.25s, box-shadow 0.25s",
            }}
          />
        );
      })}
    </div>
  );
}
