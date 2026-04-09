import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LIGHT, DARK } from "./tokens";
import { NAV } from "./data";
import Header       from "./components/Header";
import Hero         from "./components/Hero";
import About        from "./components/About";
import Projects     from "./components/Projects";
import Skills       from "./components/Skills";
import Experience   from "./components/Experience";
import Resume       from "./components/Resume";
import Contact      from "./components/Contact";
import Footer       from "./components/Footer";
import MouseTrail   from "./components/MouseTrail";
import BootScreen   from "./components/BootScreen";
import ScrollProgress from "./components/ui/ScrollProgress";
import BackToTop    from "./components/ui/BackToTop";
import SectionDots  from "./components/ui/SectionDots";

const ALL_SECTIONS = ["hero", ...NAV.map(n => n.toLowerCase())];

export default function App() {
  const [dark, setDark] = useState(() => {
    try { return localStorage.getItem("vs-dark") === "true"; } catch { return false; }
  });
  const [activeSection, setActiveSection] = useState("hero");
  const [bootDone, setBootDone] = useState(() => {
    try { return sessionStorage.getItem("vs-boot") === "true"; } catch { return true; }
  });
  const [ripple, setRipple] = useState(null); // { x, y, bg }

  const theme = dark ? DARK : LIGHT;

  /* Theme toggle — triggers ripple then flips theme */
  const handleThemeToggle = ({ x, y }) => {
    const nextDark = !dark;
    setRipple({ x, y, bg: nextDark ? DARK.bg : LIGHT.bg });
    setDark(nextDark);
    try { localStorage.setItem("vs-dark", nextDark); } catch {}
  };

  /* Intersection observer — tracks active section for nav + dots */
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); }),
      { threshold: 0.3 }
    );
    ALL_SECTIONS.forEach(id => {
      const el = document.getElementById(id);
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
      {/* Boot screen — first visit only */}
      {!bootDone && (
        <BootScreen onComplete={() => {
          try { sessionStorage.setItem("vs-boot", "true"); } catch {}
          setBootDone(true);
        }} />
      )}

      {/* Global overlays */}
      <MouseTrail   dark={dark} />
      <ScrollProgress />
      <SectionDots  activeSection={activeSection} theme={theme} />
      <BackToTop    theme={theme} />

      {/* Theme-switch ripple */}
      <AnimatePresence>
        {ripple && (
          <motion.div
            key={`${ripple.x}-${ripple.y}`}
            initial={{ clipPath: `circle(0px at ${ripple.x}px ${ripple.y}px)` }}
            animate={{ clipPath: `circle(200vmax at ${ripple.x}px ${ripple.y}px)` }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            onAnimationComplete={() => setRipple(null)}
            style={{
              position:     "fixed",
              inset:         0,
              zIndex:        500,
              background:    ripple.bg,
              pointerEvents: "none",
            }}
          />
        )}
      </AnimatePresence>

      <Header
        activeSection={activeSection}
        theme={theme}
        dark={dark}
        onToggle={handleThemeToggle}
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
