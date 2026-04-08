import React from "react";
import { motion } from "framer-motion";
import { Download, Linkedin, Terminal } from "lucide-react";
import { useBreakpoint } from "../hooks/useBreakpoint";

export default function Resume({ theme }) {
  const { isMobile } = useBreakpoint();

  return (
    <section id="resume" style={{
      padding:    isMobile ? "64px 16px" : "88px 24px",
      background:  theme.darkPanel,
      position:   "relative",
      overflow:   "hidden",
      transition: "background 0.4s",
    }}>
      {/* Grid overlay */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `linear-gradient(${theme.darkPanelFaint} 1px, transparent 1px), linear-gradient(90deg, ${theme.darkPanelFaint} 1px, transparent 1px)`,
        backgroundSize: "48px 48px", opacity: 0.28, pointerEvents: "none",
      }} />
      <div style={{ position: "absolute", top: "-30%", right: "-5%", width: isMobile ? 250 : 400, height: isMobile ? 250 : 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,71,87,0.08) 0%, transparent 65%)", filter: "blur(60px)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.175, 0.885, 0.32, 1.275] }} viewport={{ once: true }}>
          <div style={{
            width: isMobile ? 48 : 60, height: isMobile ? 48 : 60, borderRadius: "50%",
            background: theme.darkPanelSec, display: "flex", alignItems: "center",
            justifyContent: "center", margin: "0 auto 20px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.05)",
          }}>
            <Terminal size={isMobile ? 22 : 28} color={theme.accent} />
          </div>

          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 14 }}>
            <span className="led-green" />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#22c55e" }}>DOCUMENT READY</span>
          </div>

          <h2 style={{ fontSize: isMobile ? 22 : 32, fontWeight: 800, color: theme.darkPanelText, margin: "0 0 12px", letterSpacing: "-0.5px", textShadow: "0 2px 8px rgba(0,0,0,0.3)" }}>
            Want the Full Picture?
          </h2>
          <p style={{ fontSize: isMobile ? 14 : 15, color: theme.darkPanelMuted, lineHeight: 1.8, marginBottom: 32, maxWidth: 480, marginLeft: "auto", marginRight: "auto" }}>
            Work experience at Tata Motors and Team Assailing Falcons. Academic projects in cold chain analytics, process optimization, and CFD simulation. Coursework spanning Operations Research, Supply Chain Management, and Quality Engineering.
          </p>

          {/* Buttons — vertical on mobile */}
          <div style={{
            display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap",
            flexDirection: isMobile ? "column" : "row", alignItems: isMobile ? "stretch" : "center",
            maxWidth: isMobile ? 320 : "none", margin: "0 auto",
          }}>
            <motion.a href="/resume.pdf" download
              whileHover={{ y: -2 }} whileTap={{ y: 1 }}
              style={{
                padding: "15px 28px", background: theme.accent, color: "#fff", borderRadius: 13,
                fontSize: 14, fontWeight: 700, textDecoration: "none", display: "flex",
                alignItems: "center", justifyContent: "center", gap: 8,
                boxShadow: "var(--shadow-btn)", letterSpacing: "0.04em", textTransform: "uppercase",
                minHeight: 52,
              }}
            >
              <Download size={17} /> Download Resume
            </motion.a>
            <motion.a href="https://www.linkedin.com/in/vansh-singh1203" target="_blank" rel="noreferrer"
              whileHover={{ y: -2 }} whileTap={{ y: 1 }}
              style={{
                padding: "15px 26px", background: theme.darkPanelSec, color: theme.darkPanelText,
                borderRadius: 13, fontSize: 14, fontWeight: 600, textDecoration: "none",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                minHeight: 52,
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
