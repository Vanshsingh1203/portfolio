import { motion } from "framer-motion";

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.11, delayChildren: 0.04 } },
};

/** Stagger container — children with `variants` animate in sequence when scrolled into view. */
export function Stagger({ children, style, ...props }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={stagger}
      style={style}
      {...props}
    >
      {children}
    </motion.div>
  );
}
