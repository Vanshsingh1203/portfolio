import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github, CheckCircle, ChevronRight } from "lucide-react";
import Section from "./ui/Section";
import SectionTitle from "./ui/SectionTitle";
import { PROJECTS } from "../data";

const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.175, 0.885, 0.32, 1.275] } },
};
const scaleIn = {
  hidden:  { opacity: 0, scale: 0.93 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.45, ease: [0.175, 0.885, 0.32, 1.275] } },
};

/* Single corner screw */
const Screw = ({ style }) => (
  <div style={{
    position:    "absolute",
    width:        9,
    height:       9,
    borderRadius: "50%",
    background:   "radial-gradient(circle at 38% 32%, rgba(255,255,255,0.18) 0%, rgba(0,0,0,0.04) 45%, rgba(0,0,0,0.2) 100%)",
    boxShadow:    "inset 0.5px 0.5px 2px rgba(0,0,0,0.25), 0.5px 0.5px 1px rgba(255,255,255,0.06)",
    ...style,
  }} />
);

export default function Projects({ theme }) {
  const featured = PROJECTS.filter(p => p.featured);
  const other    = PROJECTS.filter(p => !p.featured);

  return (
    <Section id="projects" variant="alt" theme={theme}>
      <SectionTitle
        label="Selected Work"
        title="Featured Projects"
        subtitle="Real problems, real data, deployed in production"
        theme={theme}
      />

      {/* ── Featured projects ── */}
      <div style={{ display: "flex", flexDirection: "column", gap: 24, marginBottom: 64 }}>
        {featured.map((p, idx) => (
          <motion.div
            key={idx}
            variants={fadeUp}
            whileHover={{ y: -3, transition: { duration: 0.22 } }}
            style={{
              background:   theme.card,
              borderRadius:  18,
              padding:      "32px 30px",
              boxShadow:    "var(--shadow-card)",
              position:     "relative",
              overflow:     "hidden",
              transition:   "background 0.4s",
            }}
          >
            {/* Screws */}
            <Screw style={{ top: 11, left: 11 }} />
            <Screw style={{ top: 11, right: 11 }} />
            <Screw style={{ bottom: 11, left: 11 }} />
            <Screw style={{ bottom: 11, right: 11 }} />

            {/* Color top stripe */}
            <div style={{
              position:  "absolute",
              top:        0,
              left:       0,
              right:      0,
              height:     3,
              background: `linear-gradient(90deg, ${p.color}, ${p.color}60, transparent)`,
            }} />

            {/* Header row */}
            <div style={{
              display:        "flex",
              justifyContent: "space-between",
              alignItems:     "flex-start",
              flexWrap:       "wrap",
              gap:             16,
              marginBottom:    16,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                {/* Icon housing — recessed */}
                <div style={{
                  width:         46,
                  height:        46,
                  borderRadius:   12,
                  background:    theme.sectionAlt,
                  boxShadow:     "var(--shadow-recessed)",
                  display:       "flex",
                  alignItems:    "center",
                  justifyContent:"center",
                  color:         p.color,
                  flexShrink:    0,
                }}>
                  {p.icon}
                </div>
                <div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: theme.text, margin: "0 0 3px", letterSpacing: "-0.3px" }}>
                    {p.title}
                  </h3>
                  <span style={{
                    fontFamily:    "'JetBrains Mono', monospace",
                    fontSize:       11,
                    color:          p.color,
                    fontWeight:     600,
                    letterSpacing: "0.04em",
                  }}>
                    {p.subtitle}
                  </span>
                </div>
              </div>

              {/* CTA buttons */}
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {p.liveUrl && (
                  <motion.a
                    href={p.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 1, boxShadow: "var(--shadow-pressed)" }}
                    style={{
                      padding:       "8px 16px",
                      background:     p.color,
                      color:         "#fff",
                      borderRadius:   9,
                      fontSize:       12,
                      fontWeight:     700,
                      textDecoration: "none",
                      display:        "flex",
                      alignItems:     "center",
                      gap:             6,
                      boxShadow:     `4px 4px 10px ${p.color}45, -2px -2px 6px ${p.color}20`,
                      letterSpacing: "0.04em",
                      textTransform: "uppercase",
                    }}
                  >
                    <ExternalLink size={13} /> Live Demo
                  </motion.a>
                )}
                {p.codeUrl && (
                  <motion.a
                    href={p.codeUrl}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 1, boxShadow: "var(--shadow-pressed)" }}
                    style={{
                      padding:       "8px 14px",
                      background:    theme.sectionAlt,
                      color:         theme.textSec,
                      borderRadius:   9,
                      fontSize:       12,
                      fontWeight:     600,
                      textDecoration: "none",
                      display:        "flex",
                      alignItems:     "center",
                      gap:             6,
                      boxShadow:     "var(--shadow-sm)",
                    }}
                  >
                    <Github size={13} /> Code
                  </motion.a>
                )}
              </div>
            </div>

            {/* Description */}
            <p style={{ fontSize: 14, color: theme.textSec, lineHeight: 1.75, margin: "0 0 18px", maxWidth: 680 }}>
              {p.desc}
            </p>

            {/* Feature tags */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginBottom: 16 }}>
              {p.features.map((f, i) => (
                <span key={i} style={{
                  display:    "flex",
                  alignItems: "center",
                  gap:         5,
                  fontSize:    11,
                  color:       theme.textSec,
                  background:  theme.sectionAlt,
                  padding:    "4px 10px",
                  borderRadius: 6,
                  boxShadow:  "var(--shadow-recessed)",
                  fontWeight:  500,
                }}>
                  <CheckCircle size={10} color={p.color} />
                  {f}
                </span>
              ))}
            </div>

            {/* Tech pills */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {p.tech.map((t, i) => (
                <span key={i} style={{
                  fontSize:      11,
                  color:         p.color,
                  background:   `${p.color}14`,
                  border:        `1px solid ${p.color}30`,
                  padding:      "3px 10px",
                  borderRadius:  20,
                  fontWeight:    700,
                  fontFamily:   "'JetBrains Mono', monospace",
                  letterSpacing:"0.03em",
                }}>
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* ── Academic / Research ── */}
      <motion.div variants={fadeUp}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{
            display:       "inline-flex",
            alignItems:    "center",
            gap:            6,
            marginBottom:  10,
          }}>
            <span style={{ width: 24, height: 1, background: theme.border, display: "inline-block" }} />
            <span style={{
              fontFamily:    "'JetBrains Mono', monospace",
              fontSize:       10,
              fontWeight:     600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color:          theme.textMuted,
            }}>
              Research & Academic Work
            </span>
            <span style={{ width: 24, height: 1, background: theme.border, display: "inline-block" }} />
          </div>
          <p style={{ fontSize: 13, color: theme.textFaint, margin: 0 }}>
            Engineering projects from university and competition teams
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))", gap: 16 }}>
          {other.map((p, idx) => (
            <motion.div
              key={idx}
              variants={scaleIn}
              whileHover={{ y: -4, boxShadow: "var(--shadow-floating)", transition: { duration: 0.22 } }}
              style={{
                background:   theme.card,
                borderRadius:  15,
                padding:      "22px 20px",
                boxShadow:    "var(--shadow-card)",
                position:     "relative",
                overflow:     "hidden",
                cursor:       "default",
                transition:   "background 0.4s",
              }}
            >
              {/* Top stripe */}
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: p.color }} />

              {/* Vent slots */}
              <div style={{ position: "absolute", top: 11, right: 13, display: "flex", gap: 3 }}>
                {[0,1,2].map(i => (
                  <div key={i} style={{
                    width:     3,
                    height:    12,
                    borderRadius: 2,
                    background: theme.border,
                    boxShadow: "inset 1px 1px 2px rgba(0,0,0,0.1)",
                  }} />
                ))}
              </div>

              {/* Icon + title */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: 11, marginBottom: 12 }}>
                <div style={{
                  width:         36,
                  height:        36,
                  borderRadius:   10,
                  background:    theme.sectionAlt,
                  boxShadow:     "var(--shadow-recessed)",
                  display:       "flex",
                  alignItems:    "center",
                  justifyContent:"center",
                  color:         p.color,
                  flexShrink:    0,
                }}>
                  {p.icon}
                </div>
                <div>
                  <h4 style={{ fontSize: 14, fontWeight: 700, color: theme.text, margin: "0 0 3px" }}>{p.title}</h4>
                  <span style={{
                    fontFamily:    "'JetBrains Mono', monospace",
                    fontSize:       10,
                    color:          p.color,
                    fontWeight:     600,
                    letterSpacing: "0.04em",
                  }}>
                    {p.subtitle}
                  </span>
                </div>
              </div>

              <p style={{ fontSize: 12, color: theme.textMuted, lineHeight: 1.7, margin: "0 0 14px" }}>{p.desc}</p>

              {/* Feature list */}
              <div style={{ display: "flex", flexDirection: "column", gap: 5, marginBottom: 14 }}>
                {p.features.map((f, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <ChevronRight size={11} color={p.color} style={{ flexShrink: 0 }} />
                    <span style={{ fontSize: 11, color: theme.textSec }}>{f}</span>
                  </div>
                ))}
              </div>

              {/* Tech pills */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: (p.codeUrl || p.liveUrl) ? 12 : 0 }}>
                {p.tech.map((t, i) => (
                  <span key={i} style={{
                    fontSize:    10,
                    color:       p.color,
                    background: `${p.color}12`,
                    border:      `1px solid ${p.color}25`,
                    padding:    "2px 8px",
                    borderRadius:12,
                    fontWeight:  700,
                    fontFamily: "'JetBrains Mono', monospace",
                  }}>
                    {t}
                  </span>
                ))}
              </div>

              {/* Links */}
              {(p.codeUrl || p.liveUrl) && (
                <div style={{ display: "flex", gap: 6 }}>
                  {p.liveUrl && (
                    <a href={p.liveUrl} target="_blank" rel="noreferrer" style={{
                      padding:       "6px 11px",
                      background:     p.color,
                      color:         "#fff",
                      borderRadius:   7,
                      fontSize:       10,
                      fontWeight:     700,
                      textDecoration: "none",
                      display:        "flex",
                      alignItems:     "center",
                      gap:             4,
                      textTransform: "uppercase",
                      letterSpacing: "0.04em",
                    }}>
                      <ExternalLink size={11} /> Publication
                    </a>
                  )}
                  {p.codeUrl && (
                    <a href={p.codeUrl} target="_blank" rel="noreferrer" style={{
                      padding:       "6px 10px",
                      background:    theme.sectionAlt,
                      color:         theme.textSec,
                      borderRadius:   7,
                      fontSize:       10,
                      fontWeight:     600,
                      textDecoration: "none",
                      display:        "flex",
                      alignItems:     "center",
                      gap:             4,
                      boxShadow:     "var(--shadow-sm)",
                    }}>
                      <Github size={11} /> Code
                    </a>
                  )}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Section>
  );
}
