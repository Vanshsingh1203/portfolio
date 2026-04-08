import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Layers, Database, TrendingUp, Globe } from "lucide-react";
import Section from "./ui/Section";
import SectionTitle from "./ui/SectionTitle";
import Card from "./ui/Card";
import { useBreakpoint } from "../hooks/useBreakpoint";

const fadeUp  = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.175, 0.885, 0.32, 1.275] } } };
const scaleIn = { hidden: { opacity: 0, scale: 0.93 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.45, ease: [0.175, 0.885, 0.32, 1.275] } } };

const STATS = [
  { value: "6",    label: "Projects Built",     icon: <Layers size={16} />,   color: "#ff4757" },
  { value: "1.7M+",label: "Records Analyzed",   icon: <Database size={16} />, color: "#00ced1" },
  { value: "4+",   label: "Forecasting Models", icon: <TrendingUp size={16}/>,color: "#a78bfa" },
  { value: "3",    label: "Live Deployments",   icon: <Globe size={16} />,    color: "#22c55e" },
];
const EDU = [
  { degree: "MS Engineering Management", school: "Northeastern University", period: "Sep 2025 – Dec 2027" },
  { degree: "BE Mechanical Engineering",  school: "VIT University",         period: "Aug 2021 – Aug 2025" },
];

export default function About({ theme }) {
  const { isMobile, isTablet } = useBreakpoint();
  const cardPad = isMobile ? "20px 16px" : "28px 24px";

  return (
    <Section id="about" theme={theme}>
      <SectionTitle label="Background" title="About Me" subtitle="Part engineer, part analyst — full-time problem solver" theme={theme} />

      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(300px, 1fr))", gap: isMobile ? 20 : 36 }}>

        {/* Left — bio + education */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <Card theme={theme} screws vents style={{ padding: cardPad }}>
            <div style={{ padding: isMobile ? "2px 4px" : "4px 6px 2px" }}>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 5, marginBottom: 16,
                background: theme.sectionAlt, borderRadius: 6, padding: "3px 10px", boxShadow: "var(--shadow-recessed)",
              }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: theme.textMuted }}>LOG #001</span>
              </div>
              <p style={{ fontSize: isMobile ? 14 : 15, color: theme.textSec, lineHeight: 1.85, margin: "0 0 14px" }}>
                I build tools that bring clarity to complex operations. Currently pursuing my{" "}
                <strong style={{ color: theme.text, fontWeight: 700 }}>MS in Engineering Management</strong>{" "}
                at Northeastern University, with a Mechanical Engineering foundation from{" "}
                <strong style={{ color: theme.text, fontWeight: 700 }}>VIT</strong>.
              </p>
              <p style={{ fontSize: isMobile ? 14 : 15, color: theme.textSec, lineHeight: 1.85, margin: "0 0 14px" }}>
                At <strong style={{ color: theme.text, fontWeight: 700 }}>Tata Motors</strong>, I built cost analytics dashboards covering 100+ machines and analyzed supplier performance across 20+ vendors. With{" "}
                <strong style={{ color: theme.text, fontWeight: 700 }}>Team Assailing Falcons</strong>, I applied lean principles to cut build time by 20%.
              </p>
              <p style={{ fontSize: isMobile ? 14 : 15, color: theme.textSec, lineHeight: 1.85, margin: 0 }}>
                Now I focus on full-stack tools for real operational challenges: inventory systems for nonprofits, demand forecasting engines processing 1.7M+ records, and cold chain compliance dashboards for pharmaceutical logistics.
              </p>
            </div>
          </Card>

          {/* Education */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {EDU.map((e, i) => (
              <motion.div key={i} variants={fadeUp} style={{
                display: "flex", alignItems: "flex-start", gap: 12,
                background: theme.card, borderRadius: 12, padding: isMobile ? "12px 14px" : "14px 18px",
                boxShadow: "var(--shadow-sm)",
              }}>
                <div style={{
                  width: 34, height: 34, borderRadius: "50%", background: theme.sectionAlt,
                  boxShadow: "var(--shadow-recessed)", display: "flex", alignItems: "center",
                  justifyContent: "center", color: theme.accent, flexShrink: 0,
                }}>
                  <GraduationCap size={15} />
                </div>
                <div>
                  <div style={{ fontSize: isMobile ? 12 : 13, fontWeight: 700, color: theme.text, marginBottom: 2 }}>{e.degree}</div>
                  <div style={{ fontSize: 11, color: theme.textMuted }}>{e.school}</div>
                  <div style={{ fontSize: 10, color: theme.textFaint, marginTop: 2, fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.04em" }}>{e.period}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right — stats + banner */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: isMobile ? 10 : 14 }}>
            {STATS.map((s, i) => (
              <motion.div key={i} variants={scaleIn}
                whileHover={{ y: -4, boxShadow: "var(--shadow-floating)", transition: { duration: 0.22 } }}
                style={{
                  background: theme.card, borderRadius: 14, padding: isMobile ? "16px 14px" : "22px 18px",
                  boxShadow: "var(--shadow-card)", cursor: "default", transition: "background 0.4s",
                  position: "relative", overflow: "hidden",
                }}
              >
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: s.color, opacity: 0.6 }} />
                <div style={{
                  width: 32, height: 32, borderRadius: "50%", background: theme.sectionAlt,
                  boxShadow: "var(--shadow-recessed)", display: "flex", alignItems: "center",
                  justifyContent: "center", color: s.color, marginBottom: 10,
                }}>
                  {s.icon}
                </div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: isMobile ? 22 : 28, fontWeight: 700, color: theme.text, letterSpacing: "-1px", lineHeight: 1, marginBottom: 4 }}>
                  {s.value}
                </div>
                <div style={{ fontSize: 10, color: theme.textMuted, fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase" }}>{s.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Looking-for banner */}
          <motion.div variants={fadeUp} style={{
            background: theme.darkPanel, borderRadius: 16, padding: isMobile ? "18px 20px" : "24px 28px",
            position: "relative", overflow: "hidden", boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
          }}>
            <div style={{ position: "absolute", top: "-50%", right: "-10%", width: 180, height: 180, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,71,87,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
              <span className="led-red" />
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#ff4757" }}>CURRENTLY SEEKING</span>
            </div>
            <div style={{ fontSize: isMobile ? 15 : 17, fontWeight: 700, color: theme.darkPanelText, marginBottom: 6, lineHeight: 1.3 }}>
              Supply Chain & Operations Analytics Internships
            </div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: theme.darkPanelMuted, letterSpacing: "0.04em" }}>
              Summer 2026 · Fall 2026 · Co-op
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
