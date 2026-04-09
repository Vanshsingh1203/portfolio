import React from "react";
import { Github, Linkedin, Mail } from "lucide-react";
import { useVisitorCount } from "../hooks/useVisitorCount";

const SOCIALS = [
  { icon: <Github size={17} />,   href: "https://github.com/Vanshsingh1203" },
  { icon: <Linkedin size={17} />, href: "https://www.linkedin.com/in/vansh-singh1203" },
  { icon: <Mail size={17} />,     href: "mailto:singh.v2@northeastern.edu" },
];

function fmt(n) {
  if (n === null || n === undefined) return null;
  return n.toLocaleString("en-US");
}

export default function Footer({ theme }) {
  const { count, loading } = useVisitorCount();

  return (
    <footer style={{
      background:  theme.darkPanel,
      borderTop:  `1px solid rgba(255,255,255,0.04)`,
      padding:    "28px 24px",
      textAlign:  "center",
      transition: "background 0.4s",
    }}>

      {/* ── Status + visitor counter row ── */}
      <div style={{
        display:        "flex",
        justifyContent: "center",
        alignItems:     "center",
        gap:             10,
        flexWrap:       "wrap",
        marginBottom:    16,
      }}>
        {/* System status */}
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span className="led-green" />
          <span style={{
            fontFamily:    "'JetBrains Mono', monospace",
            fontSize:       9,
            fontWeight:     600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color:         "#3d4a6a",
          }}>
            SYSTEM OPERATIONAL
          </span>
        </div>

        <span style={{ width: 3, height: 3, borderRadius: "50%", background: "#3d4a6a", flexShrink: 0 }} />

        {/* Visitor counter — recessed readout panel */}
        <div style={{
          display:     "flex",
          alignItems:  "center",
          gap:          8,
          background:   theme.darkPanelSec,
          borderRadius:  8,
          padding:      "5px 12px",
          boxShadow:   "inset 2px 2px 5px rgba(0,0,0,0.3), inset -1px -1px 3px rgba(255,255,255,0.04)",
          border:      "1px solid rgba(255,255,255,0.04)",
        }}>
          {/* Tiny LED */}
          <div style={{
            width:        5,
            height:       5,
            borderRadius: "50%",
            background:   loading ? "#f59e0b" : "#22c55e",
            boxShadow:    loading
              ? "0 0 5px 1px rgba(245,158,11,0.6)"
              : "0 0 5px 1px rgba(34,197,94,0.6)",
            flexShrink:   0,
            transition:  "all 0.4s",
          }} />

          <span style={{
            fontFamily:    "'JetBrains Mono', monospace",
            fontSize:       9,
            fontWeight:     600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color:         "#3d4a6a",
          }}>
            VISITS
          </span>

          {/* The number */}
          <span style={{
            fontFamily:    "'JetBrains Mono', monospace",
            fontSize:       12,
            fontWeight:     700,
            letterSpacing: "0.05em",
            color:          loading ? "#3d4a6a" : "#ff4757",
            minWidth:       40,
            textAlign:     "right",
            transition:    "color 0.4s",
          }}>
            {loading ? "···" : (fmt(count) ?? "—")}
          </span>
        </div>
      </div>

      {/* Social links */}
      <div style={{ display: "flex", justifyContent: "center", gap: 10, marginBottom: 14 }}>
        {SOCIALS.map((s, i) => (
          <a key={i} href={s.href} target="_blank" rel="noreferrer"
            style={{
              width:         38,
              height:        38,
              borderRadius:   10,
              background:    theme.darkPanelSec,
              display:       "flex",
              alignItems:    "center",
              justifyContent:"center",
              color:         theme.darkPanelMuted,
              textDecoration:"none",
              border:        "1px solid rgba(255,255,255,0.05)",
              boxShadow:     "0 2px 8px rgba(0,0,0,0.15)",
              transition:    "color 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.color = theme.accent; }}
            onMouseLeave={e => { e.currentTarget.style.color = theme.darkPanelMuted; }}
          >
            {s.icon}
          </a>
        ))}
      </div>

      <p style={{
        fontFamily:    "'JetBrains Mono', monospace",
        fontSize:       10,
        color:         "#3d4a6a",
        margin:         0,
        letterSpacing: "0.04em",
      }}>
        DESIGNED & BUILT BY VANSH SINGH · {new Date().getFullYear()}
      </p>
    </footer>
  );
}
