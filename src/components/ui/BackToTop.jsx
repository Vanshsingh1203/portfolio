import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp } from "lucide-react";

const SIZE   = 52;
const STROKE = 3;
const RADIUS = (SIZE - STROKE * 2) / 2;
const CIRC   = 2 * Math.PI * RADIUS;

export default function BackToTop({ theme }) {
  const [visible, setVisible] = useState(false);
  const [pct,     setPct]     = useState(0);

  useEffect(() => {
    const update = () => {
      const scrolled = window.scrollY;
      const total    = document.documentElement.scrollHeight - window.innerHeight;
      setPct(total > 0 ? scrolled / total : 0);
      setVisible(scrolled > 400);
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.7, y: 20 }}
          animate={{ opacity: 1, scale: 1,   y: 0  }}
          exit={{    opacity: 0, scale: 0.7, y: 20 }}
          whileHover={{ scale: 1.12 }}
          whileTap={{  scale: 0.9  }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          title="Back to top"
          style={{
            position:       "fixed",
            bottom:          28,
            right:           24,
            zIndex:          90,
            width:           SIZE,
            height:          SIZE,
            borderRadius:   "50%",
            background:      theme.card,
            border:         "none",
            cursor:         "pointer",
            boxShadow:      "var(--shadow-floating)",
            display:        "flex",
            alignItems:     "center",
            justifyContent: "center",
            padding:         0,
            transition:     "background 0.4s",
          }}
        >
          {/* Progress ring */}
          <svg
            width={SIZE} height={SIZE}
            style={{ position: "absolute", top: 0, left: 0, transform: "rotate(-90deg)" }}
          >
            {/* Track */}
            <circle
              cx={SIZE / 2} cy={SIZE / 2} r={RADIUS}
              fill="none" stroke={theme.border} strokeWidth={STROKE}
            />
            {/* Fill */}
            <circle
              cx={SIZE / 2} cy={SIZE / 2} r={RADIUS}
              fill="none" stroke="#ff4757" strokeWidth={STROKE}
              strokeDasharray={CIRC}
              strokeDashoffset={CIRC * (1 - pct)}
              strokeLinecap="round"
              style={{ transition: "stroke-dashoffset 0.15s" }}
            />
          </svg>

          <ChevronUp size={18} color={theme.textSec} style={{ position: "relative", zIndex: 1 }} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
