import React from "react";
import { motion } from "framer-motion";
import { useBreakpoint } from "../../hooks/useBreakpoint";

const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.175, 0.885, 0.32, 1.275] } },
};

export default function SectionTitle({ title, subtitle, label, light, theme }) {
  const { isMobile } = useBreakpoint();

  return (
    <motion.div variants={fadeUp} style={{ textAlign: "center", marginBottom: isMobile ? 36 : 56 }}>
      {label && (
        <div style={{
          display:       "inline-flex",
          alignItems:    "center",
          gap:            6,
          marginBottom:  10,
          fontFamily:    "'JetBrains Mono', monospace",
          fontSize:       10,
          fontWeight:     600,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color:          light ? "rgba(255,255,255,0.45)" : theme.textMuted,
        }}>
          <span style={{ width: 20, height: 1, background: "currentColor", display: "inline-block" }} />
          {label}
          <span style={{ width: 20, height: 1, background: "currentColor", display: "inline-block" }} />
        </div>
      )}

      <h2 style={{
        fontSize:      "clamp(22px, 4vw, 36px)",
        fontWeight:    800,
        color:         light ? "#ffffff" : theme.text,
        margin:        "0 0 12px",
        letterSpacing: "-0.5px",
        lineHeight:    1.1,
        textShadow:    light ? "0 2px 8px rgba(0,0,0,0.3)" : "0 1px 0 rgba(255,255,255,0.7)",
      }}>
        {title}
      </h2>

      {subtitle && (
        <p style={{
          fontSize:    14,
          color:       light ? "rgba(255,255,255,0.5)" : theme.textMuted,
          margin:      0,
          maxWidth:    480,
          marginLeft:  "auto",
          marginRight: "auto",
          lineHeight:  1.65,
          padding:     isMobile ? "0 8px" : 0,
        }}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
