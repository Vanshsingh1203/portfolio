import React from "react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.175, 0.885, 0.32, 1.275] } },
};

/** Single screw head rendered as CSS radial gradient */
const Screw = ({ style }) => (
  <div style={{
    position:   "absolute",
    width:       9,
    height:      9,
    borderRadius:"50%",
    background:  "radial-gradient(circle at 38% 32%, rgba(255,255,255,0.55) 0%, rgba(0,0,0,0.04) 45%, rgba(0,0,0,0.18) 100%)",
    boxShadow:   "inset 0.5px 0.5px 1.5px rgba(0,0,0,0.18), 0.5px 0.5px 1px rgba(255,255,255,0.7)",
    ...style,
  }} />
);

/** Three vertical vent slots in the top-right corner */
const VentSlots = ({ theme }) => (
  <div style={{ position: "absolute", top: 12, right: 14, display: "flex", gap: 3 }}>
    {[0, 1, 2].map(i => (
      <div key={i} style={{
        width:     3,
        height:    14,
        borderRadius: 2,
        background: theme.border,
        boxShadow: "inset 1px 1px 2px rgba(0,0,0,0.12), inset -1px -1px 1px rgba(255,255,255,0.4)",
      }} />
    ))}
  </div>
);

/**
 * Neumorphic card with optional corner screws and vent slots.
 *
 * Props:
 *  theme       — token object
 *  elevated    — use floating shadow instead of card shadow
 *  screws      — show corner screws (default true)
 *  vents       — show vent slots top-right (default true)
 *  hover       — animate lift on hover (default true)
 *  style       — extra inline styles
 *  className   — extra class names
 */
export default function Card({
  children,
  theme,
  elevated = false,
  screws   = true,
  vents    = true,
  hover    = true,
  style    = {},
  ...rest
}) {
  const shadow = elevated ? "var(--shadow-floating)" : "var(--shadow-card)";

  return (
    <motion.div
      variants={fadeUp}
      whileHover={hover ? { y: -4, boxShadow: "var(--shadow-floating)", transition: { duration: 0.25 } } : undefined}
      style={{
        background:  theme.card,
        borderRadius:16,
        padding:     "28px 24px",
        boxShadow:   shadow,
        position:    "relative",
        overflow:    "hidden",
        transition:  "background 0.4s",
        ...style,
      }}
      {...rest}
    >
      {screws && (
        <>
          <Screw style={{ top:  10, left:  10 }} />
          <Screw style={{ top:  10, right: 10 }} />
          <Screw style={{ bottom: 10, left:  10 }} />
          <Screw style={{ bottom: 10, right: 10 }} />
        </>
      )}
      {vents && <VentSlots theme={theme} />}
      {children}
    </motion.div>
  );
}
