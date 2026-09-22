"use client";

import { motion, useReducedMotion } from "framer-motion";
import { easeOutLuxury, fadeUp } from "@/lib/motion";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={fadeUp}
      initial={reduced ? "visible" : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.85, delay, ease: easeOutLuxury }}
    >
      {children}
    </motion.div>
  );
}
