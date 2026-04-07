import React, { useState, useEffect } from "react";
import { LIGHT, DARK } from "./tokens";
import { NAV } from "./data";
import Header     from "./components/Header";
import Hero       from "./components/Hero";
import About      from "./components/About";
import Projects   from "./components/Projects";
import Skills     from "./components/Skills";
import Experience from "./components/Experience";
import Resume     from "./components/Resume";
import Contact    from "./components/Contact";
import Footer     from "./components/Footer";
import MouseTrail from "./components/MouseTrail";

export default function App() {
  const [dark, setDark] = useState(() => {
    try { return localStorage.getItem("vs-dark") === "true"; } catch { return false; }
  });
  const [activeSection, setActiveSection] = useState("");

  const theme      = dark ? DARK : LIGHT;
  const toggleDark = () => setDark(prev => {
    const next = !prev;
    try { localStorage.setItem("vs-dark", next); } catch {}
    return next;
  });

  /* Intersection observer — tracks which section is in view */
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); }),
      { threshold: 0.3 }
    );
    NAV.forEach(n => {
      const el = document.getElementById(n.toLowerCase());
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <div
      data-theme={dark ? "dark" : "light"}
      className="chassis-texture"
      style={{
        fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
        background:  theme.bg,
        transition: "background 0.4s",
        minHeight:  "100vh",
        cursor:     "none",
      }}
    >
      <MouseTrail dark={dark} />
      <Header
        activeSection={activeSection}
        theme={theme}
        dark={dark}
        toggleDark={toggleDark}
      />
      <Hero       theme={theme} />
      <About      theme={theme} />
      <Projects   theme={theme} />
      <Skills     theme={theme} />
      <Experience theme={theme} />
      <Resume     theme={theme} />
      <Contact    theme={theme} />
      <Footer     theme={theme} />
    </div>
  );
}
