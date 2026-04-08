import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Download, ArrowRight, MapPin, ChevronDown } from "lucide-react";
import { useBreakpoint } from "../hooks/useBreakpoint";

const METRICS   = [
  { label: "SHIPMENTS", value: "247",   unit: ""  },
  { label: "OTIF RATE",  value: "94.2", unit: "%" },
  { label: "INV TURN",   value: "8.3",  unit: "×" },
];
const BARS = [
  { label: "FORECAST ACC",   fill: 97, color: "#22c55e" },
  { label: "SLA COMPLIANCE", fill: 94, color: "#00ced1" },
  { label: "DEMAND CVGE",    fill: 89, color: "#a78bfa" },
];
const CHART_COLS = [52, 68, 45, 82, 61, 77, 55, 90, 70, 83];
const LINES      = ["Supply Chain Analytics", "Inventory Optimization", "Operations Research", "Data-Driven Decisions"];

const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.175, 0.885, 0.32, 1.275] } },
};
const stagger = { visible: { transition: { staggerChildren: 0.12 } } };

export default function Hero({ theme }) {
  const { isMobile, isTablet } = useBreakpoint();

  const [typed,    setTyped]    = useState("");
  const [lineIdx,  setLineIdx]  = useState(0);
  const [charIdx,  setCharIdx]  = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const line  = LINES[lineIdx];
    const delay = deleting ? 28 : 75;
    const t = setTimeout(() => {
      if (!deleting) {
        setTyped(line.substring(0, charIdx + 1));
        if (charIdx + 1 === line.length) setTimeout(() => setDeleting(true), 1600);
        else setCharIdx(c => c + 1);
      } else {
        setTyped(line.substring(0, charIdx));
        if (charIdx === 0) { setDeleting(false); setLineIdx(i => (i + 1) % LINES.length); }
        else setCharIdx(c => c - 1);
      }
    }, delay);
    return () => clearTimeout(t);
  });

  const heroPad = isMobile ? "96px 16px 64px" : isTablet ? "100px 20px 72px" : "110px 24px 80px";

  return (
    <section id="hero" style={{
      minHeight:   "100vh",
      display:     "flex",
      alignItems:  "center",
      background:   theme.darkPanel,
      position:    "relative",
      overflow:    "hidden",
      padding:      heroPad,
    }}>
      {/* Grid overlay */}
      <div style={{
        position:        "absolute",
        inset:           0,
        backgroundImage: `linear-gradient(${theme.darkPanelFaint} 1px, transparent 1px),
                          linear-gradient(90deg, ${theme.darkPanelFaint} 1px, transparent 1px)`,
        backgroundSize:  "48px 48px",
        opacity:         0.32,
        pointerEvents:  "none",
      }} />

      {/* Radial glows — clipped so they don't cause overflow on mobile */}
      <div style={{
        position:    "absolute",
        top:         "-15%",
        left:        isMobile ? "-10%" : "3%",
        width:        isMobile ? "280px" : "480px",
        height:       isMobile ? "280px" : "480px",
        borderRadius:"50%",
        background:  "radial-gradient(circle, rgba(255,71,87,0.07) 0%, transparent 65%)",
        filter:      "blur(60px)",
        pointerEvents:"none",
        animation:   "float1 10s ease-in-out infinite",
      }} />
      <div style={{
        position:    "absolute",
        bottom:      "-10%",
        right:       isMobile ? "-10%" : "8%",
        width:        isMobile ? "200px" : "360px",
        height:       isMobile ? "200px" : "360px",
        borderRadius:"50%",
        background:  "radial-gradient(circle, rgba(0,206,209,0.06) 0%, transparent 65%)",
        filter:      "blur(60px)",
        pointerEvents:"none",
        animation:   "float2 12s ease-in-out infinite",
      }} />

      <div style={{
        maxWidth:            1100,
        margin:              "0 auto",
        width:               "100%",
        display:             "grid",
        gridTemplateColumns: isMobile || isTablet ? "1fr" : "1fr 1fr",
        gap:                  isMobile ? 40 : isTablet ? 40 : 48,
        alignItems:          "center",
        position:            "relative",
        zIndex:               1,
      }}>

        {/* ── Left: text ── */}
        <motion.div initial="hidden" animate="visible" variants={stagger}
          style={{ display: "flex", flexDirection: "column", gap: 0 }}
        >
          {/* Status badge */}
          <motion.div variants={fadeUp} style={{
            display:     "inline-flex",
            alignItems:  "center",
            gap:          8,
            background:  "rgba(255,71,87,0.08)",
            border:      "1px solid rgba(255,71,87,0.18)",
            borderRadius: 50,
            padding:     isMobile ? "6px 14px" : "7px 18px",
            marginBottom: isMobile ? 20 : 28,
            width:        "fit-content",
          }}>
            <MapPin size={12} color="#ff4757" />
            <span style={{ fontSize: 11, color: "#a8b2d1", fontWeight: 600, fontFamily: "'JetBrains Mono', monospace" }}>
              Boston, MA
            </span>
            <span style={{ width: 3, height: 3, borderRadius: "50%", background: "#3d4a6a" }} />
            <span className="led-green" style={{ width: 6, height: 6 }} />
            <span style={{ fontSize: 11, color: "#22c55e", fontWeight: 700, fontFamily: "'JetBrains Mono', monospace" }}>
              OPEN
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1 variants={fadeUp} style={{
            fontSize:     "clamp(34px, 7vw, 62px)",
            fontWeight:    800,
            color:        "#e0e5ec",
            margin:       "0 0 8px",
            lineHeight:    1.05,
            letterSpacing:"-2px",
            textShadow:   "0 2px 12px rgba(0,0,0,0.4)",
          }}>
            Hi, I'm{" "}
            <span style={{
              background:           "linear-gradient(135deg, #ff4757 0%, #ff8fa3 50%, #ff4757 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor:  "transparent",
            }}>
              Vansh Singh
            </span>
          </motion.h1>

          {/* Typewriter */}
          <motion.div variants={fadeUp} style={{
            fontFamily:  "'JetBrains Mono', monospace",
            fontSize:    "clamp(14px, 3vw, 22px)",
            color:       "#6b7a9f",
            margin:      "0 0 20px",
            minHeight:   isMobile ? 28 : 34,
            fontWeight:  500,
          }}>
            <span style={{ color: "#ff4757" }}>→ </span>
            {typed}
            <span style={{ animation: "blink 1s step-end infinite", color: "#ff4757" }}>_</span>
          </motion.div>

          {/* Bio */}
          <motion.p variants={fadeUp} style={{
            fontSize:   isMobile ? 14 : 15,
            color:      "#6b7a9f",
            lineHeight: 1.8,
            maxWidth:   480,
            margin:     "0 0 32px",
          }}>
            Engineering Management grad who builds tools that turn operational chaos into
            clean, data-driven systems. I make supply chains visible — from warehouse floors
            to interactive dashboards.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp} style={{
            display:   "flex",
            gap:        10,
            flexWrap:  "wrap",
          }}>
            <motion.a
              href="#projects"
              onClick={e => { e.preventDefault(); document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }); }}
              whileHover={{ y: -2 }} whileTap={{ y: 1 }}
              style={{
                padding:       isMobile ? "14px 22px" : "13px 26px",
                background:    "#ff4757",
                color:         "#fff",
                borderRadius:   12,
                fontSize:       isMobile ? 13 : 14,
                fontWeight:     700,
                textDecoration: "none",
                display:        "flex",
                alignItems:     "center",
                gap:             8,
                boxShadow:     "var(--shadow-btn)",
                letterSpacing: "0.03em",
                textTransform: "uppercase",
                minHeight:      48,
              }}
            >
              View Projects <ArrowRight size={16} />
            </motion.a>

            <motion.a
              href="/resume.pdf" download
              whileHover={{ y: -2 }} whileTap={{ y: 1 }}
              style={{
                padding:       isMobile ? "14px 18px" : "13px 22px",
                background:    "rgba(255,255,255,0.05)",
                color:         "#a8b2d1",
                borderRadius:   12,
                fontSize:       isMobile ? 13 : 14,
                fontWeight:     600,
                textDecoration: "none",
                display:        "flex",
                alignItems:     "center",
                gap:             8,
                border:        "1px solid rgba(255,255,255,0.1)",
                minHeight:      48,
              }}
            >
              <Download size={16} /> Resume
            </motion.a>

            {[
              { href: "https://github.com/Vanshsingh1203",           icon: <Github size={18} /> },
              { href: "https://www.linkedin.com/in/vansh-singh1203", icon: <Linkedin size={18} /> },
            ].map((l, i) => (
              <motion.a
                key={i} href={l.href} target="_blank" rel="noreferrer"
                whileHover={{ y: -2 }} whileTap={{ y: 1 }}
                style={{
                  padding:     "14px 15px",
                  background:  "rgba(255,255,255,0.05)",
                  color:       "#6b7a9f",
                  borderRadius: 12,
                  textDecoration:"none",
                  display:     "flex",
                  alignItems:  "center",
                  border:      "1px solid rgba(255,255,255,0.1)",
                  minHeight:    48,
                  minWidth:     48,
                  justifyContent:"center",
                }}
              >
                {l.icon}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Right: device panel (hidden on mobile/tablet) ── */}
        {!isMobile && !isTablet && (
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.175, 0.885, 0.32, 1.275] }}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <DevicePanel />
          </motion.div>
        )}
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 9, 0] }}
        transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
        style={{
          position:  "absolute",
          bottom:     isMobile ? 20 : 28,
          left:      "50%",
          transform: "translateX(-50%)",
          display:   "flex",
          flexDirection:"column",
          alignItems:"center",
          gap:        4,
        }}
      >
        <span style={{
          fontFamily:    "'JetBrains Mono', monospace",
          fontSize:       9,
          fontWeight:     600,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color:         "#3d4a6a",
        }}>SCROLL</span>
        <ChevronDown size={18} color="#3d4a6a" />
      </motion.div>
    </section>
  );
}

function DevicePanel() {
  return (
    <div style={{
      width:        "100%",
      maxWidth:      440,
      background:   "#1a1f2e",
      borderRadius:  20,
      padding:       "3px",
      boxShadow:    "0 28px 56px rgba(0,0,0,0.45), 0 8px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)",
      border:       "1.5px solid rgba(255,255,255,0.06)",
    }}>
      {/* Bezel header */}
      <div style={{ padding: "10px 16px 8px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
          <span className="led-green" />
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#4a5568" }}>
            OPS CONTROL PANEL
          </span>
        </div>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: "#3d4a6a" }}>v2.4.1</span>
      </div>

      {/* Screen */}
      <div style={{
        background:     "#0d1117",
        borderRadius:    14,
        padding:         "16px",
        margin:          "0 2px",
        position:        "relative",
        overflow:        "hidden",
        backgroundImage: "linear-gradient(rgba(255,255,255,0) 50%, rgba(0,0,0,0.18) 50%)",
        backgroundSize:  "100% 4px",
      }}>
        {/* Screen header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14, paddingBottom: 10, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span className="led-red" style={{ width: 6, height: 6 }} />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "#ff4757", letterSpacing: "0.08em", fontWeight: 600 }}>■ LIVE DATA</span>
          </div>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: "#2d3a50" }}>
            {new Date().toLocaleTimeString("en-US", { hour12: false })}
          </span>
        </div>

        {/* Metrics */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 14 }}>
          {METRICS.map((m, i) => (
            <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 8, padding: "10px 8px", textAlign: "center" }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 18, fontWeight: 700, color: "#e0e5ec", lineHeight: 1, marginBottom: 4 }}>
                {m.value}<span style={{ fontSize: 11, opacity: 0.6 }}>{m.unit}</span>
              </div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 8, color: "#3d4a6a", letterSpacing: "0.08em", textTransform: "uppercase" }}>{m.label}</div>
            </div>
          ))}
        </div>

        {/* Progress bars */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 14 }}>
          {BARS.map((b, i) => (
            <div key={i}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: "#3d4a6a", letterSpacing: "0.06em", textTransform: "uppercase" }}>{b.label}</span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: b.color, fontWeight: 600 }}>{b.fill}%</span>
              </div>
              <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 2, height: 4, overflow: "hidden" }}>
                <motion.div
                  initial={{ width: 0 }} animate={{ width: `${b.fill}%` }}
                  transition={{ duration: 1.2, delay: 0.8 + i * 0.15, ease: "easeOut" }}
                  style={{ height: "100%", background: b.color, borderRadius: 2 }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Mini chart */}
        <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 36, paddingTop: 4, borderTop: "1px solid rgba(255,255,255,0.04)" }}>
          {CHART_COLS.map((h, i) => (
            <motion.div key={i}
              initial={{ height: 0 }} animate={{ height: `${h}%` }}
              transition={{ duration: 0.6, delay: 1.0 + i * 0.05, ease: "easeOut" }}
              style={{ flex: 1, background: i === CHART_COLS.length - 1 ? "#ff4757" : "rgba(255,255,255,0.12)", borderRadius: "2px 2px 0 0", minHeight: 2 }}
            />
          ))}
        </div>
      </div>

      {/* Controls */}
      <div style={{ padding: "10px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", gap: 8 }}>
          {["#ff4757","#22c55e","#f59e0b"].map((c, i) => (
            <div key={i} style={{ width: 14, height: 14, borderRadius: "50%", background: c, boxShadow: `0 0 6px 1px ${c}60, inset 0 1px 2px rgba(255,255,255,0.3)` }} />
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: "#3d4a6a", letterSpacing: "0.1em", textTransform: "uppercase" }}>PWR</span>
          <span className="led-green" style={{ width: 7, height: 7 }} />
        </div>
      </div>
    </div>
  );
}
