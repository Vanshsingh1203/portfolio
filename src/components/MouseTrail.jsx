import { useEffect, useRef } from "react";

// ── Palette ───────────────────────────────────────────────────────────────
const C_RED    = "#ff4757"; // accent
const C_ORANGE = "#f97316"; // warm spark
const C_AMBER  = "#fbbf24"; // hot spark
const C_WHITE  = "#ffffff"; // bright hit

// ── Draw the precision targeting reticle ─────────────────────────────────
function drawReticle(ctx, x, y, alpha = 1, scale = 1) {
  const R    = 11 * scale;   // ring radius
  const GAP  = 4  * scale;   // gap between ring edge and tick start
  const TICK = 9  * scale;   // tick length
  const LW   = 1  * scale;   // line width

  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.strokeStyle = C_RED;
  ctx.lineWidth   = LW;
  ctx.shadowBlur  = alpha > 0.5 ? 6 : 0;
  ctx.shadowColor = C_RED;

  // Broken ring — 4 arc segments, gaps at N/S/E/W
  const GAP_A = 0.28; // gap angle in radians each side of cardinal
  for (let i = 0; i < 4; i++) {
    const base  = (i * Math.PI) / 2;
    const start = base + GAP_A;
    const end   = base + Math.PI / 2 - GAP_A;
    ctx.beginPath();
    ctx.arc(x, y, R, start, end);
    ctx.stroke();
  }

  // 4 tick marks extending outward from the cardinal gaps
  const dirs = [
    [0,  -1],   // top
    [0,   1],   // bottom
    [-1,  0],   // left
    [1,   0],   // right
  ];
  ctx.beginPath();
  for (const [dx, dy] of dirs) {
    const sx = x + dx * (R + GAP);
    const sy = y + dy * (R + GAP);
    ctx.moveTo(sx, sy);
    ctx.lineTo(sx + dx * TICK, sy + dy * TICK);
  }
  ctx.stroke();

  // Tiny corner notches (aesthetic detail at 45° positions)
  ctx.globalAlpha = alpha * 0.35;
  ctx.lineWidth   = LW * 0.8;
  const NOTCH_DIST = R * 1.55;
  const NOTCH_LEN  = 3.5 * scale;
  for (let i = 0; i < 4; i++) {
    const angle = (i * Math.PI) / 2 + Math.PI / 4;
    const nx = x + Math.cos(angle) * NOTCH_DIST;
    const ny = y + Math.sin(angle) * NOTCH_DIST;
    const tx = -Math.sin(angle) * NOTCH_LEN;
    const ty =  Math.cos(angle) * NOTCH_LEN;
    ctx.beginPath();
    ctx.moveTo(nx - tx, ny - ty);
    ctx.lineTo(nx + tx, ny + ty);
    ctx.stroke();
  }

  // Center dot — glowing
  ctx.shadowBlur  = alpha > 0.4 ? 10 : 0;
  ctx.shadowColor = C_RED;
  ctx.globalAlpha = alpha * 0.95;
  ctx.fillStyle   = C_RED;
  ctx.lineWidth   = LW;
  ctx.beginPath();
  ctx.arc(x, y, 1.8 * scale, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

// ── Coordinate readout beside the reticle ────────────────────────────────
function drawCoords(ctx, x, y, dark) {
  const OFFSET_X = 20;
  const OFFSET_Y = -4;

  ctx.save();
  ctx.font         = "8px 'JetBrains Mono', monospace";
  ctx.textBaseline = "top";

  // Dark background pill for legibility
  const xStr = `X:${String(Math.round(x)).padStart(4, " ")}`;
  const yStr = `Y:${String(Math.round(y)).padStart(4, " ")}`;
  const w = Math.max(ctx.measureText(xStr).width, ctx.measureText(yStr).width) + 8;

  ctx.globalAlpha  = 0.55;
  ctx.fillStyle    = dark ? "#0d111d" : "#e0e5ec";
  ctx.beginPath();
  ctx.roundRect(x + OFFSET_X - 2, y + OFFSET_Y - 1, w, 21, 3);
  ctx.fill();

  ctx.globalAlpha  = 0.7;
  ctx.fillStyle    = C_RED;
  ctx.fillText(xStr, x + OFFSET_X + 2, y + OFFSET_Y + 1);
  ctx.globalAlpha  = 0.5;
  ctx.fillStyle    = dark ? "#6b7a9f" : "#636e72";
  ctx.fillText(yStr, x + OFFSET_X + 2, y + OFFSET_Y + 11);

  ctx.restore();
}

export default function MouseTrail({ dark }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Skip on touch/coarse pointer devices (mobile)
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const canvas = canvasRef.current;
    const ctx    = canvas.getContext("2d");

    // ── State (all in refs for perf — no re-renders) ──────────────────
    const particles = [];  // spark + cross-tick particles
    const ghosts    = [];  // ghost reticle echoes
    const mouse     = { x: -200, y: -200 };
    const prev      = { x: -200, y: -200 };
    let   animId    = null;
    let   lastGhost = 0;

    // ── Resize ────────────────────────────────────────────────────────
    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // ── Mouse move ────────────────────────────────────────────────────
    const onMove = (e) => {
      prev.x  = mouse.x;
      prev.y  = mouse.y;
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      const dx    = mouse.x - prev.x;
      const dy    = mouse.y - prev.y;
      const speed = Math.sqrt(dx * dx + dy * dy);

      // ── Spark particles ──────────────────────────────────────────
      const count = Math.min(Math.ceil(speed / 3.5) + 1, 12);
      for (let i = 0; i < count; i++) {
        // Direction biased toward movement + random spread
        const baseAngle = Math.atan2(dy, dx);
        const angle     = baseAngle + (Math.random() - 0.5) * 1.8;
        const v         = 0.2 + Math.random() * (speed * 0.12 + 1.0);

        const palette = [C_RED, C_ORANGE, C_AMBER, C_WHITE];
        const roll    = Math.random();

        particles.push({
          x:     e.clientX + (Math.random() - 0.5) * 4,
          y:     e.clientY + (Math.random() - 0.5) * 4,
          vx:    Math.cos(angle) * v,
          vy:    Math.sin(angle) * v,
          life:  1,
          decay: 0.018 + Math.random() * 0.028,
          size:  0.8 + Math.random() * 2.2,
          color: roll < 0.45 ? C_RED : roll < 0.7 ? C_ORANGE : roll < 0.88 ? C_AMBER : C_WHITE,
          type:  Math.random() > 0.72 ? "cross" : "dot",   // 28% are machining cross-ticks
          glow:  Math.random() > 0.45,
        });
      }

      // ── Ghost reticle every ~36px at speed ───────────────────────
      const now = Date.now();
      if (speed > 10 && now - lastGhost > 80) {
        ghosts.push({
          x:     e.clientX,
          y:     e.clientY,
          life:  0.7,
          decay: 0.05,
          scale: 0.65 + Math.random() * 0.25,
        });
        lastGhost = now;
      }
    };
    window.addEventListener("mousemove", onMove);

    // ── Animation loop ────────────────────────────────────────────────
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Ghost reticles (drawn first, underneath)
      for (let i = ghosts.length - 1; i >= 0; i--) {
        const g = ghosts[i];
        g.life -= g.decay;
        if (g.life <= 0) { ghosts.splice(i, 1); continue; }
        drawReticle(ctx, g.x, g.y, g.life * 0.18, g.scale);
      }

      // Particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life -= p.decay;
        if (p.life <= 0) { particles.splice(i, 1); continue; }

        p.x  += p.vx;
        p.y  += p.vy;
        p.vx *= 0.93;
        p.vy *= 0.93;

        const alpha = Math.pow(p.life, 1.4) * 0.9;
        const r     = p.size * p.life;

        ctx.save();
        ctx.globalAlpha = alpha;

        if (p.glow) {
          ctx.shadowBlur  = 7;
          ctx.shadowColor = p.color;
        }

        if (p.type === "cross") {
          // Machining cross-tick mark
          ctx.strokeStyle = p.color;
          ctx.lineWidth   = 0.9;
          ctx.beginPath();
          ctx.moveTo(p.x - r * 1.4, p.y);
          ctx.lineTo(p.x + r * 1.4, p.y);
          ctx.moveTo(p.x, p.y - r * 1.4);
          ctx.lineTo(p.x, p.y + r * 1.4);
          ctx.stroke();
        } else {
          // Spark dot
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, Math.max(r, 0.3), 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }

      // Main reticle — drawn last (on top)
      if (mouse.x > -100) {
        drawReticle(ctx, mouse.x, mouse.y, 0.72, 1);
        drawCoords(ctx, mouse.x, mouse.y, dark);
      }

      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(animId);
    };
  }, [dark]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position:      "fixed",
        inset:          0,
        zIndex:         9998,
        pointerEvents: "none",
      }}
    />
  );
}
