import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Linkedin, Github, Send, CheckCircle } from "lucide-react";
import Section from "./ui/Section";
import SectionTitle from "./ui/SectionTitle";

const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.175, 0.885, 0.32, 1.275] } },
};

const LINKS = [
  { icon: <Mail size={17} />,     label: "singh.v2@northeastern.edu",     href: "mailto:singh.v2@northeastern.edu" },
  { icon: <Linkedin size={17} />, label: "linkedin.com/in/vansh-singh1203", href: "https://www.linkedin.com/in/vansh-singh1203" },
  { icon: <Github size={17} />,   label: "github.com/Vanshsingh1203",      href: "https://github.com/Vanshsingh1203" },
];

export default function Contact({ theme }) {
  const [form,    setForm]    = useState({ name: "", email: "", message: "" });
  const [status,  setStatus]  = useState(null);
  const [sending, setSending] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      const res = await fetch("https://formspree.io/f/mqeywzye", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(form),
      });
      if (res.ok) { setStatus("sent"); setForm({ name: "", email: "", message: "" }); }
      else setStatus("error");
    } catch { setStatus("error"); }
    setSending(false);
  };

  /* Recessed input style */
  const inputStyle = {
    width:       "100%",
    padding:     "13px 16px",
    background:   theme.inputBg,
    border:       "none",
    borderRadius: 10,
    fontSize:     14,
    outline:      "none",
    boxSizing:    "border-box",
    color:        theme.text,
    fontFamily:  "'JetBrains Mono', 'Roboto Mono', monospace",
    boxShadow:   "var(--shadow-recessed)",
    transition:  "box-shadow 0.25s",
  };

  return (
    <Section id="contact" theme={theme}>
      <SectionTitle
        label="Contact"
        title="Get In Touch"
        subtitle="Open to supply chain, operations, and analytics opportunities"
        theme={theme}
      />

      <div style={{
        display:             "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap:                  36,
        maxWidth:             900,
        margin:              "0 auto",
      }}>
        {/* ── Left: contact links ── */}
        <motion.div variants={fadeUp}>
          <h3 style={{ fontSize: 17, fontWeight: 700, color: theme.text, margin: "0 0 10px" }}>
            Let's Connect
          </h3>
          <p style={{ fontSize: 14, color: theme.textMuted, lineHeight: 1.75, margin: "0 0 24px" }}>
            Whether you have an internship opportunity, want to discuss supply chain analytics,
            or just want to say hi — I'd love to hear from you.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {LINKS.map((l, i) => (
              <motion.a
                key={i}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                whileHover={{ x: 5, transition: { duration: 0.15 } }}
                whileTap={{ scale: 0.98 }}
                style={{
                  display:        "flex",
                  alignItems:     "center",
                  gap:             12,
                  padding:        "14px 18px",
                  background:      theme.card,
                  borderRadius:    13,
                  textDecoration:  "none",
                  color:           theme.textSec,
                  fontSize:        13,
                  fontWeight:      500,
                  boxShadow:      "var(--shadow-card)",
                  transition:     "background 0.3s",
                }}
              >
                {/* Icon housing */}
                <div style={{
                  width:         36,
                  height:        36,
                  borderRadius:   9,
                  background:    theme.sectionAlt,
                  boxShadow:     "var(--shadow-recessed)",
                  display:       "flex",
                  alignItems:    "center",
                  justifyContent:"center",
                  color:         theme.accent,
                  flexShrink:    0,
                }}>
                  {l.icon}
                </div>
                <span style={{
                  fontFamily:    "'JetBrains Mono', monospace",
                  fontSize:       11,
                  letterSpacing: "0.02em",
                  lineHeight:    1.3,
                }}>
                  {l.label}
                </span>
              </motion.a>
            ))}
          </div>

          {/* Availability note */}
          <div style={{
            marginTop:  20,
            padding:   "14px 18px",
            background:  theme.card,
            borderRadius:13,
            boxShadow:  "var(--shadow-sm)",
            display:    "flex",
            alignItems: "center",
            gap:         10,
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
              Available for Summer 2026 · Fall 2026 internships
            </span>
          </div>
        </motion.div>

        {/* ── Right: form ── */}
        <motion.div variants={fadeUp}>
          {status === "sent" ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              style={{
                background:   theme.card,
                borderRadius:  18,
                padding:       48,
                textAlign:    "center",
                boxShadow:    "var(--shadow-card)",
              }}
            >
              <div style={{
                width:         56,
                height:        56,
                borderRadius:  "50%",
                background:    theme.sectionAlt,
                boxShadow:     "var(--shadow-recessed)",
                display:       "flex",
                alignItems:    "center",
                justifyContent:"center",
                margin:        "0 auto 16px",
              }}>
                <CheckCircle size={28} color="#22c55e" />
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: "#22c55e", margin: "0 0 8px" }}>Message Sent!</h3>
              <p style={{ fontSize: 13, color: theme.textMuted, margin: 0 }}>I'll get back to you soon.</p>
            </motion.div>
          ) : (
            <div style={{
              background:   theme.card,
              borderRadius:  18,
              padding:      "28px 24px",
              boxShadow:    "var(--shadow-card)",
            }}>
              {/* Form stamp */}
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 20 }}>
                <div style={{
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
                  }}>
                    FORM INPUT
                  </span>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {[
                  { label: "Name",  key: "name",  type: "text",  placeholder: "Your name" },
                  { label: "Email", key: "email", type: "email", placeholder: "your@email.com" },
                ].map(f => (
                  <div key={f.key}>
                    <label style={{
                      fontSize:    11,
                      fontWeight:  700,
                      color:       theme.textSec,
                      display:    "block",
                      marginBottom: 7,
                      fontFamily: "'JetBrains Mono', monospace",
                      letterSpacing:"0.05em",
                      textTransform:"uppercase",
                    }}>
                      {f.label}
                    </label>
                    <input
                      type={f.type}
                      value={form[f.key]}
                      onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                      placeholder={f.placeholder}
                      style={inputStyle}
                      onFocus={e => { e.target.style.boxShadow = `var(--shadow-recessed), 0 0 0 2px ${theme.accent}40`; }}
                      onBlur={e  => { e.target.style.boxShadow = "var(--shadow-recessed)"; }}
                    />
                  </div>
                ))}

                <div>
                  <label style={{
                    fontSize:    11,
                    fontWeight:  700,
                    color:       theme.textSec,
                    display:    "block",
                    marginBottom: 7,
                    fontFamily: "'JetBrains Mono', monospace",
                    letterSpacing:"0.05em",
                    textTransform:"uppercase",
                  }}>
                    Message
                  </label>
                  <textarea
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell me about the opportunity..."
                    rows={4}
                    style={{ ...inputStyle, resize: "vertical", fontFamily: "'JetBrains Mono', monospace" }}
                    onFocus={e => { e.target.style.boxShadow = `var(--shadow-recessed), 0 0 0 2px ${theme.accent}40`; }}
                    onBlur={e  => { e.target.style.boxShadow = "var(--shadow-recessed)"; }}
                  />
                </div>

                <motion.button
                  onClick={submit}
                  disabled={sending || !form.name || !form.email || !form.message}
                  whileHover={(!sending && form.name && form.email && form.message)
                    ? { y: -2 } : {}}
                  whileTap={(!sending && form.name && form.email && form.message)
                    ? { y: 1, boxShadow: "var(--shadow-pressed)" } : {}}
                  style={{
                    padding:        "13px",
                    background:      sending || !form.name || !form.email || !form.message
                                       ? theme.border
                                       : theme.accent,
                    color:          "#fff",
                    border:         "none",
                    borderRadius:    12,
                    fontSize:        13,
                    fontWeight:      700,
                    cursor:          sending || !form.name || !form.email || !form.message
                                       ? "not-allowed" : "pointer",
                    display:         "flex",
                    alignItems:      "center",
                    justifyContent:  "center",
                    gap:              8,
                    boxShadow:       sending || !form.name || !form.email || !form.message
                                       ? "none" : "var(--shadow-btn)",
                    letterSpacing:  "0.05em",
                    textTransform:  "uppercase",
                    transition:     "all 0.2s",
                  }}
                >
                  {sending ? "SENDING…" : <><Send size={15} /> Send Message</>}
                </motion.button>

                {status === "error" && (
                  <p style={{ fontSize: 12, color: "#dc2626", margin: 0, fontFamily: "'JetBrains Mono', monospace" }}>
                    ERROR: Something went wrong. Try emailing directly.
                  </p>
                )}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </Section>
  );
}
