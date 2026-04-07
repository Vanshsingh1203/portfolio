import React from "react";
import { Github, Linkedin, Mail } from "lucide-react";

const SOCIALS = [
  { icon: <Github size={17} />,   href: "https://github.com/Vanshsingh1203" },
  { icon: <Linkedin size={17} />, href: "https://www.linkedin.com/in/vansh-singh1203" },
  { icon: <Mail size={17} />,     href: "mailto:singh.v2@northeastern.edu" },
];

export default function Footer({ theme }) {
  return (
    <footer style={{
      background:  theme.darkPanel,
      borderTop:  `1px solid rgba(255,255,255,0.04)`,
      padding:    "28px 24px",
      textAlign:  "center",
      transition: "background 0.4s",
    }}>
      {/* System status row */}
      <div style={{
        display:        "flex",
        justifyContent: "center",
        alignItems:     "center",
        gap:             8,
        marginBottom:   16,
      }}>
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
        <span style={{ width: 3, height: 3, borderRadius: "50%", background: "#3d4a6a" }} />
        <span style={{
          fontFamily:    "'JetBrains Mono', monospace",
          fontSize:       9,
          color:         "#3d4a6a",
          letterSpacing: "0.06em",
        }}>
          UPTIME: 100%
        </span>
      </div>

      {/* Social links */}
      <div style={{ display: "flex", justifyContent: "center", gap: 10, marginBottom: 16 }}>
        {SOCIALS.map((s, i) => (
          <a
            key={i}
            href={s.href}
            target="_blank"
            rel="noreferrer"
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
