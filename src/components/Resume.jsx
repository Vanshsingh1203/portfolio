import React from "react";
import { motion } from "framer-motion";
import { Download, Linkedin, Terminal } from "lucide-react";

export default function Resume({ theme }) {
  return (
    <section
      id="resume"
      style={{
        padding:    "88px 24px",
        background:  theme.darkPanel,
        position:   "relative",
        overflow:   "hidden",
        transition: "background 0.4s",
      }}
    >
      {/* Grid overlay */}
      <div style={{
        position:        "absolute",
        inset:           0,
        backgroundImage: `linear-gradient(${theme.darkPanelFaint} 1px, transparent 1px),
                          linear-gradient(90deg, ${theme.darkPanelFaint} 1px, transparent 1px)`,
        backgroundSize:  "48px 48px",
        opacity:         0.3,
        pointerEvents:   "none",
      }} />

      {/* Radial glow */}
      <div style={{
        position:    "absolute",
        top:         "-30%",
        right:       "-5%",
        width:        400,
        height:       400,
        borderRadius: "50%",
        background:   "radial-gradient(circle, rgba(255,71,87,0.08) 0%, transparent 65%)",
        filter:       "blur(60px)",
        pointerEvents:"none",
      }} />

      <div style={{
        maxWidth:  700,
        margin:   "0 auto",
        textAlign:"center",
        position: "relative",
        zIndex:    1,
      }}>
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.175, 0.885, 0.32, 1.275] }}
          viewport={{ once: true }}
        >
          {/* Icon housing */}
          <div style={{
            width:         60,
            height:        60,
            borderRadius:  "50%",
            background:    theme.darkPanelSec,
            display:       "flex",
            alignItems:    "center",
            justifyContent:"center",
            margin:        "0 auto 24px",
            boxShadow:     "0 8px 24px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.05)",
          }}>
            <Terminal size={28} color={theme.accent} />
          </div>

          {/* Status label */}
          <div style={{
            display:    "inline-flex",
            alignItems: "center",
            gap:         6,
            marginBottom:16,
          }}>
            <span className="led-green" />
            <span style={{
              fontFamily:    "'JetBrains Mono', monospace",
              fontSize:       10,
              fontWeight:     600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color:         "#22c55e",
            }}>
              DOCUMENT READY
            </span>
          </div>

          <h2 style={{
            fontSize:      "clamp(24px, 4vw, 32px)",
            fontWeight:     800,
            color:         theme.darkPanelText,
            margin:        "0 0 14px",
            letterSpacing: "-0.5px",
            textShadow:    "0 2px 8px rgba(0,0,0,0.3)",
          }}>
            Want the Full Picture?
          </h2>

          <p style={{
            fontSize:   15,
            color:      theme.darkPanelMuted,
            lineHeight: 1.8,
            marginBottom:36,
            maxWidth:   520,
            marginLeft: "auto",
            marginRight:"auto",
          }}>
            Work experience at Tata Motors and Team Assailing Falcons. Academic projects in
            cold chain analytics, process optimization, and CFD simulation. Coursework spanning
            Operations Research, Supply Chain Management, and Quality Engineering.
          </p>

          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <motion.a
              href="/resume.pdf"
              download
              whileHover={{ y: -2 }}
              whileTap={{ y: 1, boxShadow: "var(--shadow-pressed)" }}
              style={{
                padding:       "13px 28px",
                background:     theme.accent,
                color:         "#fff",
                borderRadius:   13,
                fontSize:       14,
                fontWeight:     700,
                textDecoration: "none",
                display:        "flex",
                alignItems:     "center",
                gap:             8,
                boxShadow:     "var(--shadow-btn)",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
              }}
            >
              <Download size={17} /> Download Resume
            </motion.a>

            <motion.a
              href="https://www.linkedin.com/in/vansh-singh1203"
              target="_blank"
              rel="noreferrer"
              whileHover={{ y: -2 }}
              whileTap={{ y: 1 }}
              style={{
                padding:       "13px 26px",
                background:    theme.darkPanelSec,
                color:         theme.darkPanelText,
                borderRadius:   13,
                fontSize:       14,
                fontWeight:     600,
                textDecoration: "none",
                display:        "flex",
                alignItems:     "center",
                gap:             8,
                border:        `1px solid rgba(255,255,255,0.08)`,
                boxShadow:     "0 4px 12px rgba(0,0,0,0.15)",
              }}
            >
              <Linkedin size={17} /> LinkedIn
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
