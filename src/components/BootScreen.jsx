import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LINES = [
  { text: "INDUSTRIAL PORTFOLIO OS v2.4.1",           accent: false, dim: true,  delay: 0    },
  { text: "Loading supply chain analytics module...", accent: false, dim: false, delay: 300  },
  { text: "CPU: Demand Forecasting Engine — OK",      accent: false, dim: false, delay: 600  },
  { text: "RAM: 1,700,000 records indexed",           accent: false, dim: false, delay: 850  },
  { text: "GPU: Data Visualization Engine — OK",      accent: false, dim: false, delay: 1050 },
  { text: "NET: Boston, MA — ONLINE",                 accent: false, dim: false, delay: 1250 },
  { text: "BOOT COMPLETE",                            accent: true,  dim: false, delay: 1500 },
];

const EXIT_DELAY = 1900; // ms before exit animation starts

export default function BootScreen({ onComplete }) {
  const [lines,   setLines]   = useState([]);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    LINES.forEach(line => {
      setTimeout(() => setLines(prev => [...prev, line]), line.delay);
    });
    setTimeout(() => setVisible(false), EXIT_DELAY);
  }, []);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {visible && (
        <motion.div
          exit={{ opacity: 0, scale: 1.015 }}
          transition={{ duration: 0.55, ease: "easeInOut" }}
          style={{
            position:       "fixed",
            inset:          0,
            background:     "#080b12",
            zIndex:         1000,
            display:        "flex",
            alignItems:     "center",
            justifyContent: "center",
          }}
        >
          {/* CRT scanline overlay */}
          <div style={{
            position:        "absolute",
            inset:           0,
            pointerEvents:   "none",
            backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.18) 2px, rgba(0,0,0,0.18) 4px)",
          }} />

          {/* Terminal window */}
          <div style={{ maxWidth: 560, width: "90%", fontFamily: "'JetBrains Mono', monospace" }}>
            {/* Title bar */}
            <div style={{
              background: "#111827", borderRadius: "10px 10px 0 0",
              padding: "10px 16px", display: "flex", alignItems: "center", gap: 8,
              borderBottom: "1px solid #1f2937",
            }}>
              {["#ff4757", "#f59e0b", "#22c55e"].map(c => (
                <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c, boxShadow: `0 0 6px ${c}80` }} />
              ))}
              <span style={{ marginLeft: 8, fontSize: 11, color: "#374151", letterSpacing: "0.08em" }}>
                vs://boot.terminal
              </span>
            </div>

            {/* Terminal body */}
            <div style={{
              background: "#0d1117", borderRadius: "0 0 10px 10px",
              padding: "24px 20px", minHeight: 210,
              border: "1px solid #1f2937", borderTop: "none",
            }}>
              {lines.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.18 }}
                  style={{ marginBottom: 7, display: "flex", alignItems: "center", gap: 8, fontSize: 12 }}
                >
                  {line.accent ? (
                    <>
                      <span className="led-green" style={{ width: 7, height: 7, flexShrink: 0 }} />
                      <span style={{ color: "#22c55e", fontWeight: 700, letterSpacing: "0.1em" }}>{line.text}</span>
                    </>
                  ) : (
                    <>
                      <span style={{ color: "#374151", flexShrink: 0 }}>$</span>
                      <span style={{ color: line.dim ? "#374151" : "#6b7a9f" }}>{line.text}</span>
                    </>
                  )}
                  {i === lines.length - 1 && !line.accent && (
                    <span style={{ color: "#22c55e", animation: "blink 1s step-end infinite", marginLeft: 2 }}>▋</span>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
