import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useBreakpoint } from "../../hooks/useBreakpoint";

const stagger = { visible: { transition: { staggerChildren: 0.09 } } };

export default function Section({ children, id, variant = "default", theme, style }) {
  const ref      = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const { isMobile, isTablet } = useBreakpoint();

  let background;
  if (variant === "dark")     background = theme.darkPanel;
  else if (variant === "alt") background = theme.sectionAlt;
  else                        background = theme.bg;

  const pad = isMobile ? "56px 16px" : isTablet ? "72px 20px" : "96px 24px";

  return (
    <motion.section
      ref={ref}
      id={id}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={stagger}
      style={{ padding: pad, background, position: "relative", transition: "background 0.4s", ...style }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>{children}</div>
    </motion.section>
  );
}
