import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

/**
 * Drop-in replacement for motion.div.
 * Accepts all motion.div props (variants, whileHover, whileTap, style, etc.)
 * and adds a subtle 3-D tilt on mouse move.
 */
export default function TiltCard({ children, style, maxDeg = 5, ...props }) {
  const ref    = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const xSpring = useSpring(mouseX, { stiffness: 300, damping: 25 });
  const ySpring = useSpring(mouseY, { stiffness: 300, damping: 25 });

  const rotateX = useTransform(ySpring, [-0.5, 0.5], [ maxDeg, -maxDeg]);
  const rotateY = useTransform(xSpring, [-0.5, 0.5], [-maxDeg,  maxDeg]);

  const handleMouseMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width  - 0.5);
    mouseY.set((e.clientY - rect.top)  / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ ...style, rotateX, rotateY, transformPerspective: 1200 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
