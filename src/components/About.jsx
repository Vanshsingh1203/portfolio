import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Layers, Database, TrendingUp, Globe } from "lucide-react";
import Section from "./ui/Section";
import SectionTitle from "./ui/SectionTitle";
import Card from "./ui/Card";

const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.175, 0.885, 0.32, 1.275] } },
};
const scaleIn = {
  hidden:  { opacity: 0, scale: 0.93 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.45, ease: [0.175, 0.885, 0.32, 1.275] } },
};

const STATS = [
  { value: "6",    label: "Projects Built",      icon: <Layers size={17} />,   color: "#ff4757" },
  { value: "1.7M+",label: "Records Analyzed",    icon: <Database size={17} />, color: "#00ced1" },
  { value: "4+",   label: "Forecasting Models",  icon: <TrendingUp size={17}/>,color: "#a78bfa" },
  { value: "3",    label: "Live Deployments",     icon: <Globe size={17} />,    color: "#22c55e" },
];

const EDU = [
  { degree: "MS Engineering Management", school: "Northeastern University", period: "Sep 2025 – Dec 2027" },
  { degree: "BE Mechanical Engineering",  school: "VIT University",          period: "Aug 2021 – Aug 2025" },
];

export default function About({ theme }) {
  return (
    <Section id="about" theme={theme}>
      <SectionTitle
        label="Background"
        title="About Me"
        subtitle="Part engineer, part analyst — full-time problem solver"
        theme={theme}
      />

      <div style={{
        display:             "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
        gap:                  36,
      }}>
        {/* Left — bio + education */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Card theme={theme} screws vents>
            <div style={{ padding: "4px 6px 2px" }}>
              {/* Section stamp */}
              <div style={{
                display:       "inline-flex",
                alignItems:    "center",
                gap:            5,
                marginBottom:  18,
                background:    theme.sectionAlt,
                borderRadius:   6,
                padding:       "4px 10px",
                boxShadow:     "var(--shadow-recessed)",
              }}>
                <span style={{
                  fontFamily:    "'JetBrains Mono', monospace",
                  fontSize:       9,
                  fontWeight:     600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color:          theme.textMuted,
                }}>LOG #001</span>
              </div>

              <p style={{ fontSize: 15, color: theme.textSec, lineHeight: 1.85, margin: "0 0 16px" }}>
                I build tools that bring clarity to complex operations. Currently pursuing my{" "}
                <strong style={{ color: theme.text, fontWeight: 700 }}>MS in Engineering Management</strong>{" "}
                at Northeastern University, with a Mechanical Engineering foundation from{" "}
                <strong style={{ color: theme.text, fontWeight: 700 }}>VIT</strong>.
              </p>
              <p style={{ fontSize: 15, color: theme.textSec, lineHeight: 1.85, margin: "0 0 16px" }}>
                At <strong style={{ color: theme.text, fontWeight: 700 }}>Tata Motors</strong>, I built cost analytics
                dashboards covering 100+ machines and analyzed supplier performance across 20+ vendors. With{" "}
                <strong style={{ color: theme.text, fontWeight: 700 }}>Team Assailing Falcons</strong>, I applied lean
                principles to streamline the build process for a 12-member team, cutting build time by 20%.
              </p>
              <p style={{ fontSize: 15, color: theme.textSec, lineHeight: 1.85, margin: 0 }}>
                Now I focus on full-stack tools for real operational challenges: inventory systems for nonprofits,
                demand forecasting engines processing 1.7M+ records, and cold chain compliance dashboards for
                pharmaceutical logistics. I turn data into decisions.
              </p>
            </div>
          </Card>

          {/* Education */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {EDU.map((e, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                style={{
                  display:    "flex",
                  alignItems: "flex-start",
                  gap:         12,
                  background:  theme.card,
                  borderRadius:12,
                  padding:    "14px 18px",
                  boxShadow:  "var(--shadow-sm)",
                }}
              >
                <div style={{
                  width:        36,
                  height:       36,
                  borderRadius: "50%",
                  background:   theme.sectionAlt,
                  boxShadow:    "var(--shadow-recessed)",
                  display:      "flex",
                  alignItems:   "center",
                  justifyContent:"center",
                  color:        theme.accent,
                  flexShrink:   0,
                }}>
                  <GraduationCap size={16} />
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: theme.text, marginBottom: 2 }}>{e.degree}</div>
                  <div style={{ fontSize: 12, color: theme.textMuted }}>{e.school}</div>
                  <div style={{
                    fontSize:      10,
                    color:         theme.textFaint,
                    marginTop:      3,
                    fontFamily:    "'JetBrains Mono', monospace",
                    letterSpacing: "0.04em",
                  }}>{e.period}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right — stats grid + looking-for banner */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            {STATS.map((s, i) => (
              <motion.div
                key={i}
                variants={scaleIn}
                whileHover={{ y: -4, boxShadow: "var(--shadow-floating)", transition: { duration: 0.22 } }}
                style={{
                  background:   theme.card,
                  borderRadius:  14,
                  padding:      "22px 18px",
                  boxShadow:    "var(--shadow-card)",
                  cursor:       "default",
                  transition:   "background 0.4s",
                  position:     "relative",
                  overflow:     "hidden",
                }}
              >
                {/* Top accent stripe */}
                <div style={{
                  position:  "absolute",
                  top:        0,
                  left:       0,
                  right:      0,
                  height:     2,
                  background: s.color,
                  opacity:    0.6,
                }} />

                {/* Icon housing */}
                <div style={{
                  width:         36,
                  height:        36,
                  borderRadius:  "50%",
                  background:    theme.sectionAlt,
                  boxShadow:     "var(--shadow-recessed)",
                  display:       "flex",
                  alignItems:    "center",
                  justifyContent:"center",
                  color:         s.color,
                  marginBottom:  12,
                }}>
                  {s.icon}
                </div>

                <div style={{
                  fontFamily:    "'JetBrains Mono', monospace",
                  fontSize:       28,
                  fontWeight:     700,
                  color:          theme.text,
                  letterSpacing: "-1px",
                  lineHeight:     1,
                  marginBottom:   6,
                }}>
                  {s.value}
                </div>
                <div style={{
                  fontSize:      11,
                  color:         theme.textMuted,
                  fontWeight:    600,
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                }}>
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>

          {/* "Currently looking for" banner */}
          <motion.div
            variants={fadeUp}
            style={{
              background:   theme.darkPanel,
              borderRadius:  16,
              padding:      "24px 28px",
              position:     "relative",
              overflow:     "hidden",
              boxShadow:    "0 8px 24px rgba(0,0,0,0.15)",
            }}
          >
            {/* Background accent */}
            <div style={{
              position:   "absolute",
              top:        "-50%",
              right:      "-10%",
              width:       200,
              height:      200,
              borderRadius:"50%",
              background:  "radial-gradient(circle, rgba(255,71,87,0.12) 0%, transparent 70%)",
              pointerEvents:"none",
            }} />

            <div style={{
              display:       "flex",
              alignItems:    "center",
              gap:            6,
              marginBottom:  10,
            }}>
              <span className="led-red" />
              <span style={{
                fontFamily:    "'JetBrains Mono', monospace",
                fontSize:       9,
                fontWeight:     600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color:         "#ff4757",
              }}>
                CURRENTLY SEEKING
              </span>
            </div>

            <div style={{
              fontSize:      17,
              fontWeight:    700,
              color:         theme.darkPanelText,
              marginBottom:   6,
              lineHeight:    1.3,
            }}>
              Supply Chain & Operations Analytics Internships
            </div>
            <div style={{
              fontFamily:    "'JetBrains Mono', monospace",
              fontSize:       11,
              color:         theme.darkPanelMuted,
              letterSpacing: "0.04em",
            }}>
              Summer 2026 · Fall 2026 · Co-op
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
