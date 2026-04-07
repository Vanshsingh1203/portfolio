import React from "react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.175, 0.885, 0.32, 1.275] } },
};

/**
 * Consistent section header.
 * light → white text (for dark-bg sections)
 */
export default function SectionTitle({ title, subtitle, label, light, theme }) {
  return (
    <motion.div variants={fadeUp} style={{ textAlign: "center", marginBottom: 56 }}>
      {/* Industrial stamp label */}
      {label && (
        <div style={{
          display:        "inline-flex",
          alignItems:     "center",
          gap:            6,
          marginBottom:   12,
          fontFamily:     "'JetBrains Mono', monospace",
          fontSize:       11,
          fontWeight:     600,
          letterSpacing:  "0.12em",
          textTransform:  "uppercase",
          color:          light ? "rgba(255,255,255,0.5)" : theme.textMuted,
        }}>
          <span style={{ width: 20, height: 1, background: "currentColor", display: "inline-block" }} />
          {label}
          <span style={{ width: 20, height: 1, background: "currentColor", display: "inline-block" }} />
        </div>
      )}

      <h2 style={{
        fontSize:      "clamp(26px, 4vw, 36px)",
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
          fontSize:   15,
          color:      light ? "rgba(255,255,255,0.55)" : theme.textMuted,
          margin:     0,
          maxWidth:   520,
          marginLeft: "auto",
          marginRight:"auto",
          lineHeight: 1.65,
        }}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
