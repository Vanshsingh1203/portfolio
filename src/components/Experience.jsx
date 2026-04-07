import React from "react";
import { motion } from "framer-motion";
import { Calendar, ChevronRight, MapPin } from "lucide-react";
import Section from "./ui/Section";
import SectionTitle from "./ui/SectionTitle";
import { EXPERIENCES } from "../data";

const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.175, 0.885, 0.32, 1.275] } },
};

export default function Experience({ theme }) {
  return (
    <Section id="experience" variant="alt" theme={theme}>
      <SectionTitle
        label="Career"
        title="Work Experience"
        subtitle="Building operational excellence through data and process improvement"
        theme={theme}
      />

      <div style={{ maxWidth: 820, margin: "0 auto", position: "relative" }}>
        {/* Vertical connector pipe */}
        <div style={{
          position:    "absolute",
          left:         19,
          top:           0,
          bottom:        0,
          width:          4,
          borderRadius:  2,
          background:    theme.border,
          boxShadow:     "var(--shadow-recessed)",
        }} />

        {EXPERIENCES.map((exp, idx) => (
          <motion.div
            key={idx}
            variants={fadeUp}
            style={{
              position:    "relative",
              paddingLeft:  60,
              marginBottom: idx === EXPERIENCES.length - 1 ? 0 : 32,
            }}
          >
            {/* Timeline node — raised neumorphic circle */}
            <div style={{
              position:      "absolute",
              left:           8,
              top:            20,
              width:          24,
              height:         24,
              borderRadius:  "50%",
              background:    theme.card,
              boxShadow:     "var(--shadow-floating)",
              display:       "flex",
              alignItems:    "center",
              justifyContent:"center",
              zIndex:          1,
            }}>
              <div style={{
                width:        10,
                height:       10,
                borderRadius: "50%",
                background:    exp.color,
                boxShadow:    `0 0 8px 2px ${exp.color}60`,
              }} />
            </div>

            {/* Card */}
            <div style={{
              background:   theme.card,
              borderRadius:  16,
              padding:      "26px 26px",
              boxShadow:    "var(--shadow-card)",
              position:     "relative",
              overflow:     "hidden",
              transition:   "background 0.4s",
            }}>
              {/* Left accent bar */}
              <div style={{
                position:  "absolute",
                top:        0,
                left:       0,
                bottom:     0,
                width:      3,
                background: exp.color,
                opacity:    0.75,
              }} />

              {/* Header */}
              <div style={{
                display:        "flex",
                justifyContent: "space-between",
                alignItems:     "flex-start",
                flexWrap:       "wrap",
                gap:             12,
                marginBottom:    18,
              }}>
                <div>
                  <h3 style={{
                    fontSize:      18,
                    fontWeight:     700,
                    color:         theme.text,
                    margin:        "0 0 6px",
                    letterSpacing: "-0.3px",
                  }}>
                    {exp.title}
                  </h3>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                    <span style={{
                      fontSize:    13,
                      color:       exp.color,
                      fontWeight:  700,
                    }}>
                      {exp.company}
                    </span>
                    <span style={{ width: 3, height: 3, borderRadius: "50%", background: theme.border }} />
                    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <MapPin size={11} color={theme.textMuted} />
                      <span style={{ fontSize: 12, color: theme.textMuted }}>{exp.location}</span>
                    </div>
                  </div>
                </div>

                {/* Period badge — recessed */}
                <div style={{
                  display:    "flex",
                  alignItems: "center",
                  gap:         6,
                  background:  theme.sectionAlt,
                  padding:    "6px 12px",
                  borderRadius: 8,
                  boxShadow:  "var(--shadow-recessed)",
                  flexShrink:  0,
                }}>
                  <Calendar size={12} color={theme.textMuted} />
                  <span style={{
                    fontFamily:    "'JetBrains Mono', monospace",
                    fontSize:       11,
                    color:          theme.textSec,
                    fontWeight:     600,
                    letterSpacing: "0.03em",
                  }}>
                    {exp.period}
                  </span>
                </div>
              </div>

              {/* Achievements */}
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {exp.achievements.map((a, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <div style={{
                      width:        18,
                      height:       18,
                      borderRadius: "50%",
                      background:   theme.sectionAlt,
                      boxShadow:    "var(--shadow-recessed)",
                      display:      "flex",
                      alignItems:   "center",
                      justifyContent:"center",
                      flexShrink:   0,
                      marginTop:    1,
                    }}>
                      <ChevronRight size={10} color={exp.color} />
                    </div>
                    <span style={{ fontSize: 13.5, color: theme.textSec, lineHeight: 1.65 }}>{a}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
