import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, Menu, X } from "lucide-react";
import { NAV } from "../data";

export default function Header({ activeSection, theme, dark, toggleDark }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const headerBg = scrolled
    ? theme.bg
    : "transparent";

  const headerShadow = scrolled ? "var(--shadow-sm)" : "none";

  return (
    <header style={{
      position:      "fixed",
      top:           0,
      left:          0,
      right:         0,
      zIndex:        100,
      padding:       scrolled ? "10px 28px" : "20px 28px",
      background:    headerBg,
      boxShadow:     headerShadow,
      backdropFilter:scrolled ? "blur(12px)" : "none",
      transition:    "all 0.35s",
    }}>
      <div style={{
        maxWidth:       1100,
        margin:         "0 auto",
        display:        "flex",
        justifyContent: "space-between",
        alignItems:     "center",
      }}>

        {/* Logo */}
        <a
          href="#hero"
          onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          style={{
            fontFamily:     "'JetBrains Mono', monospace",
            fontSize:        20,
            fontWeight:      700,
            color:           scrolled ? theme.text : "#e0e5ec",
            textDecoration:  "none",
            letterSpacing:   "0.04em",
            transition:      "color 0.3s",
            display:         "flex",
            alignItems:      "center",
            gap:             8,
          }}
        >
          {/* LED indicator */}
          <span className="led-green" />
          VS<span style={{ color: theme.accent }}>.</span>
        </a>

        {/* Desktop nav */}
        <nav
          className="desktop-nav"
          style={{ display: "flex", gap: 4, alignItems: "center" }}
        >
          {NAV.map(n => {
            const isActive = activeSection === n.toLowerCase();
            return (
              <button
                key={n}
                onClick={() => scrollTo(n)}
                style={{
                  background:    isActive ? theme.accentGlow : "none",
                  border:        isActive ? `1px solid ${theme.accent}30` : "1px solid transparent",
                  borderRadius:  8,
                  color:         isActive ? theme.accent : (scrolled ? theme.textMuted : "rgba(224,229,236,0.65)"),
                  fontSize:      13,
                  fontWeight:    isActive ? 700 : 500,
                  fontFamily:    "'Inter', sans-serif",
                  letterSpacing: isActive ? "0.02em" : 0,
                  cursor:        "pointer",
                  padding:       "7px 14px",
                  transition:    "all 0.2s",
                }}
              >
                {n}
              </button>
            );
          })}

          {/* Status + toggle */}
          <div style={{
            display:    "flex",
            alignItems: "center",
            gap:         10,
            marginLeft:  12,
            paddingLeft: 12,
            borderLeft: `1px solid ${scrolled ? theme.border : "rgba(255,255,255,0.12)"}`,
          }}>
            <span style={{
              fontFamily:    "'JetBrains Mono', monospace",
              fontSize:       10,
              fontWeight:     600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color:          scrolled ? theme.textMuted : "rgba(224,229,236,0.45)",
            }}>
              ONLINE
            </span>

            <motion.button
              onClick={toggleDark}
              whileTap={{ scale: 0.9 }}
              style={{
                background: scrolled ? theme.card : "rgba(255,255,255,0.08)",
                border:     `1px solid ${scrolled ? theme.border : "rgba(255,255,255,0.12)"}`,
                borderRadius:10,
                padding:    "8px 10px",
                cursor:     "pointer",
                color:      scrolled ? theme.textSec : "rgba(224,229,236,0.8)",
                display:    "flex",
                alignItems: "center",
                boxShadow:  scrolled ? "var(--shadow-sm)" : "none",
                transition: "all 0.3s",
              }}
            >
              {dark ? <Sun size={15} /> : <Moon size={15} />}
            </motion.button>
          </div>
        </nav>

        {/* Mobile hamburger */}
        <div className="mobile-btn" style={{ alignItems: "center", gap: 10 }}>
          <motion.button
            onClick={toggleDark}
            whileTap={{ scale: 0.9 }}
            style={{
              background:  "rgba(255,255,255,0.08)",
              border:      "1px solid rgba(255,255,255,0.12)",
              borderRadius:8,
              padding:     "8px",
              cursor:      "pointer",
              color:       "#e0e5ec",
              display:     "flex",
            }}
          >
            {dark ? <Sun size={16} /> : <Moon size={16} />}
          </motion.button>

          <motion.button
            onClick={() => setMenuOpen(!menuOpen)}
            whileTap={{ scale: 0.9 }}
            style={{
              background:  "rgba(255,255,255,0.08)",
              border:      "1px solid rgba(255,255,255,0.12)",
              borderRadius:8,
              padding:     "8px",
              cursor:      "pointer",
              color:       scrolled ? theme.text : "#e0e5ec",
              display:     "flex",
            }}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            style={{
              position:     "absolute",
              top:          "100%",
              left:          0,
              right:         0,
              background:    theme.card,
              boxShadow:     "var(--shadow-card)",
              padding:       "16px 24px 20px",
              display:       "flex",
              flexDirection: "column",
              gap:            8,
            }}
          >
            {/* ONLINE status */}
            <div style={{
              display:    "flex",
              alignItems: "center",
              gap:         6,
              paddingBottom: 12,
              borderBottom: `1px solid ${theme.border}`,
              marginBottom: 4,
            }}>
              <span className="led-green" />
              <span style={{
                fontFamily:    "'JetBrains Mono', monospace",
                fontSize:       10,
                fontWeight:     600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color:          theme.textMuted,
              }}>
                SYSTEM ONLINE
              </span>
            </div>

            {NAV.map(n => (
              <button
                key={n}
                onClick={() => scrollTo(n)}
                style={{
                  background:   activeSection === n.toLowerCase() ? theme.accentGlow : "none",
                  border:       "none",
                  borderRadius: 8,
                  color:        activeSection === n.toLowerCase() ? theme.accent : theme.textSec,
                  fontSize:     15,
                  fontWeight:   activeSection === n.toLowerCase() ? 700 : 500,
                  cursor:       "pointer",
                  textAlign:    "left",
                  padding:      "11px 12px",
                }}
              >
                {n}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
