import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const stagger = { visible: { transition: { staggerChildren: 0.09 } } };

/**
 * Section wrapper with stagger-on-scroll reveal.
 * variant: "default" | "alt" | "dark"
 * dark   → uses darkPanel colors (hero, resume)
 * alt    → uses sectionAlt
 * default→ uses bg
 */
export default function Section({ children, id, variant = "default", theme, style }) {
  const ref      = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  let background;
  if (variant === "dark") {
    background = theme.darkPanel;
  } else if (variant === "alt") {
    background = theme.sectionAlt;
  } else {
    background = theme.bg;
  }

  return (
    <motion.section
      ref={ref}
      id={id}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={stagger}
      style={{
        padding:    "96px 24px",
        background,
        position:   "relative",
        transition: "background 0.4s",
        ...style,
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>{children}</div>
    </motion.section>
  );
}
