import React from "react";
import { motion } from "framer-motion";
import { ChevronRight, Award, Wrench } from "lucide-react";
import Section from "./ui/Section";
import SectionTitle from "./ui/SectionTitle";
import Card from "./ui/Card";
import { SKILLS, TOOLS } from "../data";

const scaleIn = {
  hidden:  { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.45, ease: [0.175, 0.885, 0.32, 1.275] } },
};
const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.175, 0.885, 0.32, 1.275] } },
};

const CERTS = [
  { name: "Six Sigma Green Belt", org: "Lean Six Sigma Institute",          icon: <Award size={20} />,  color: "#22c55e" },
  { name: "CSWP",                 org: "Certified SolidWorks Professional", icon: <Wrench size={20} />, color: "#f59e0b" },
];

export default function Skills({ theme }) {
  return (
    <Section id="skills" theme={theme}>
      <SectionTitle
        label="Capabilities"
        title="Skills & Expertise"
        subtitle="Where engineering discipline meets data-driven thinking"
        theme={theme}
      />

      {/* Skill category panels */}
      <div style={{
        display:             "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(252px, 1fr))",
        gap:                  18,
        marginBottom:         48,
      }}>
        {Object.entries(SKILLS).map(([cat, { icon, color, items }], idx) => (
          <Card key={idx} theme={theme} screws vents>
            {/* Icon housing — recessed circle */}
            <div style={{
              display:    "flex",
              alignItems: "center",
              gap:         12,
              marginBottom:18,
              marginTop:   4,
            }}>
              <div style={{
                width:         44,
                height:        44,
                borderRadius:  "50%",
                background:    theme.sectionAlt,
                boxShadow:     "var(--shadow-recessed)",
                display:       "flex",
                alignItems:    "center",
                justifyContent:"center",
                color,
                flexShrink:    0,
              }}>
                {icon}
              </div>
              <h3 style={{
                fontSize:    14,
                fontWeight:   700,
                color:        theme.text,
                margin:       0,
                lineHeight:   1.3,
              }}>
                {cat}
              </h3>
            </div>

            {/* Category label stamp */}
            <div style={{
              display:      "inline-flex",
              alignItems:   "center",
              gap:           4,
              marginBottom: 14,
              background:    theme.sectionAlt,
              borderRadius:  5,
              padding:      "3px 8px",
              boxShadow:    "var(--shadow-recessed)",
            }}>
              <div style={{ width: 5, height: 5, borderRadius: "50%", background: color }} />
              <span style={{
                fontFamily:    "'JetBrains Mono', monospace",
                fontSize:       8,
                fontWeight:     700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color:          theme.textMuted,
              }}>
                {items.length} SKILLS
              </span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
              {items.map((s, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <ChevronRight size={11} color={color} style={{ flexShrink: 0 }} />
                  <span style={{ fontSize: 12.5, color: theme.textSec, lineHeight: 1.4 }}>{s}</span>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>

      {/* Tools & Technologies */}
      <motion.div variants={fadeUp} style={{ marginBottom: 48 }}>
        <div style={{ textAlign: "center", marginBottom: 22 }}>
          <span style={{
            fontFamily:    "'JetBrains Mono', monospace",
            fontSize:       10,
            fontWeight:     600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color:          theme.textMuted,
          }}>
            Tools & Technologies
          </span>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 9 }}>
          {TOOLS.map((t, i) => (
            <motion.div
              key={i}
              variants={scaleIn}
              whileHover={{ y: -3, boxShadow: "var(--shadow-floating)", transition: { duration: 0.18 } }}
              whileTap={{ scale: 0.96, boxShadow: "var(--shadow-pressed)" }}
              style={{
                padding:    "8px 15px",
                background:  theme.card,
                borderRadius:10,
                boxShadow:  "var(--shadow-sm)",
                fontSize:    12.5,
                fontWeight:  600,
                color:       theme.textSec,
                cursor:     "default",
                display:    "flex",
                alignItems: "center",
                gap:         6,
                transition: "background 0.3s",
                userSelect: "none",
              }}
            >
              <span style={{ fontSize: 14 }}>{t.icon}</span>
              {t.name}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Certifications */}
      <motion.div variants={fadeUp}>
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <span style={{
            fontFamily:    "'JetBrains Mono', monospace",
            fontSize:       10,
            fontWeight:     600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color:          theme.textMuted,
          }}>
            Certifications
          </span>
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
          {CERTS.map((c, i) => (
            <motion.div
              key={i}
              variants={scaleIn}
              whileHover={{ y: -4, boxShadow: "var(--shadow-floating)", transition: { duration: 0.2 } }}
              style={{
                background:   theme.card,
                borderRadius:  14,
                padding:      "20px 26px",
                display:      "flex",
                alignItems:   "center",
                gap:           14,
                boxShadow:    "var(--shadow-card)",
                cursor:       "default",
                transition:   "background 0.3s",
                position:     "relative",
                overflow:     "hidden",
              }}
            >
              {/* Top stripe */}
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: c.color }} />

              {/* Icon housing */}
              <div style={{
                width:         44,
                height:        44,
                borderRadius:   12,
                background:    theme.sectionAlt,
                boxShadow:     "var(--shadow-recessed)",
                display:       "flex",
                alignItems:    "center",
                justifyContent:"center",
                color:         c.color,
              }}>
                {c.icon}
              </div>
              <div>
                <div style={{
                  fontSize:    14,
                  fontWeight:  700,
                  color:       theme.text,
                  marginBottom: 3,
                }}>
                  {c.name}
                </div>
                <div style={{ fontSize: 11, color: theme.textMuted }}>{c.org}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Section>
  );
}
