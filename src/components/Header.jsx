import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, Menu, X } from "lucide-react";
import { NAV } from "../data";

export default function Header({ activeSection, theme, dark, onToggle }) {
  const fireToggle = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    onToggle({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
  };
  const [scrolled,   setScrolled]  = useState(false);
  const [menuOpen,   setMenuOpen]  = useState(false);
  const [dotLooped,  setDotLooped] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDotLooped(true), 1400);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Close drawer on resize to desktop
  useEffect(() => {
    const fn = () => { if (window.innerWidth >= 769) setMenuOpen(false); };
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -72, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: [0.175, 0.885, 0.32, 1.275] }}
      style={{
        position:      "fixed",
        top:            0,
        left:           0,
        right:          0,
        zIndex:         100,
        padding:        scrolled ? "10px 20px" : "18px 20px",
        background:     scrolled ? theme.bg : "transparent",
        boxShadow:      scrolled ? "var(--shadow-sm)" : "none",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        transition:    "padding 0.35s, background 0.35s, box-shadow 0.35s",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>

        {/* Logo */}
        <a href="#hero" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: 18, fontWeight: 700,
            color: scrolled ? theme.text : "#e0e5ec", textDecoration: "none",
            letterSpacing: "0.04em", transition: "color 0.3s",
            display: "flex", alignItems: "center", gap: 7,
          }}
        >
          <motion.span
            className="led-green"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.55, duration: 0.35, type: "spring", stiffness: 500, damping: 18 }}
          />
          {["V", "S"].map((c, i) => (
            <motion.span
              key={c}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + i * 0.13, duration: 0.3, ease: [0.175, 0.885, 0.32, 1.275] }}
            >
              {c}
            </motion.span>
          ))}
          <motion.span
            style={{ color: theme.accent }}
            initial={{ opacity: 0 }}
            animate={dotLooped ? { opacity: [1, 0.22, 1] } : { opacity: 1 }}
            transition={dotLooped
              ? { duration: 2.4, repeat: Infinity, ease: "easeInOut" }
              : { delay: 0.98, duration: 0.4 }}
          >
            .
          </motion.span>
          {/* Blinking terminal cursor */}
          <motion.span
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0, 1, 1, 0, 0] }}
            transition={{ delay: 1.7, duration: 1.1, times: [0, 0.01, 0.01, 0.55, 0.55, 1], repeat: Infinity, ease: "linear" }}
            style={{ color: theme.accent, marginLeft: -1, userSelect: "none", fontWeight: 300 }}
          >_</motion.span>
        </a>

        {/* Desktop nav */}
        <nav className="desktop-nav" style={{ display: "flex", gap: 3, alignItems: "center" }}>
          {NAV.map(n => {
            const isActive = activeSection === n.toLowerCase();
            return (
              <button key={n} onClick={() => scrollTo(n)} style={{
                background:    "none",
                border:        "1px solid transparent",
                borderRadius:   8,
                color:          isActive ? theme.accent : (scrolled ? theme.textMuted : "rgba(224,229,236,0.6)"),
                fontSize:       13,
                fontWeight:     isActive ? 700 : 500,
                letterSpacing:  isActive ? "0.02em" : 0,
                cursor:        "pointer",
                padding:       "8px 13px",
                minHeight:      40,
                position:      "relative",
                transition:    "color 0.2s, font-weight 0.2s",
              }}>
                {isActive && (
                  <motion.div
                    layoutId="nav-pill"
                    style={{
                      position: "absolute", inset: 0, borderRadius: 8,
                      background: theme.accentGlow,
                      border: `1px solid ${theme.accent}30`,
                      zIndex: 0,
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  />
                )}
                <span style={{ position: "relative", zIndex: 1 }}>{n}</span>
              </button>
            );
          })}

          {/* Divider + toggle */}
          <div style={{
            display: "flex", alignItems: "center", gap: 8, marginLeft: 10,
            paddingLeft: 10, borderLeft: `1px solid ${scrolled ? theme.border : "rgba(255,255,255,0.12)"}`,
          }}>
            <span style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: 9, fontWeight: 600,
              letterSpacing: "0.1em", textTransform: "uppercase",
              color: scrolled ? theme.textMuted : "rgba(224,229,236,0.4)",
            }}>ONLINE</span>

            <motion.button onClick={fireToggle} whileTap={{ scale: 0.88 }} style={{
              background:  scrolled ? theme.card : "rgba(255,255,255,0.07)",
              border:     `1px solid ${scrolled ? theme.border : "rgba(255,255,255,0.12)"}`,
              borderRadius: 9, padding: "9px 10px", cursor: "pointer",
              color: scrolled ? theme.textSec : "rgba(224,229,236,0.75)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: scrolled ? "var(--shadow-sm)" : "none", transition: "all 0.3s",
              minHeight: 40, minWidth: 40,
            }}>
              {dark ? <Sun size={15} /> : <Moon size={15} />}
            </motion.button>
          </div>
        </nav>

        {/* Mobile controls */}
        <div className="mobile-btn" style={{ alignItems: "center", gap: 8 }}>
          <motion.button onClick={fireToggle} whileTap={{ scale: 0.88 }} style={{
            background:  "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 9, padding: "11px", cursor: "pointer",
            color: "#e0e5ec", display: "flex", minHeight: 44, minWidth: 44,
            alignItems: "center", justifyContent: "center",
          }}>
            {dark ? <Sun size={17} /> : <Moon size={17} />}
          </motion.button>

          <motion.button onClick={() => setMenuOpen(!menuOpen)} whileTap={{ scale: 0.88 }} style={{
            background:  scrolled ? theme.card : "rgba(255,255,255,0.07)",
            border:     `1px solid ${scrolled ? theme.border : "rgba(255,255,255,0.12)"}`,
            borderRadius: 9, padding: "11px", cursor: "pointer",
            color: scrolled ? theme.text : "#e0e5ec", display: "flex",
            minHeight: 44, minWidth: 44, alignItems: "center", justifyContent: "center",
          }}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "absolute", top: "100%", left: 0, right: 0,
              background: theme.card, boxShadow: "var(--shadow-card)",
              padding: "12px 16px 16px",
              display: "flex", flexDirection: "column", gap: 4,
              borderTop: `1px solid ${theme.border}`,
            }}
          >
            {/* Status row */}
            <div style={{
              display: "flex", alignItems: "center", gap: 6,
              paddingBottom: 10, borderBottom: `1px solid ${theme.border}`, marginBottom: 4,
            }}>
              <span className="led-green" />
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: theme.textMuted }}>SYSTEM ONLINE</span>
            </div>

            {NAV.map(n => {
              const isActive = activeSection === n.toLowerCase();
              return (
                <button key={n} onClick={() => scrollTo(n)} style={{
                  background:   isActive ? theme.accentGlow : "none",
                  border:       `1px solid ${isActive ? `${theme.accent}30` : "transparent"}`,
                  borderRadius:  9,
                  color:         isActive ? theme.accent : theme.textSec,
                  fontSize:      15,
                  fontWeight:    isActive ? 700 : 500,
                  cursor:       "pointer",
                  textAlign:    "left",
                  padding:      "13px 14px",
                  minHeight:     52,
                  width:        "100%",
                  transition:   "all 0.15s",
                }}>
                  {n}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
