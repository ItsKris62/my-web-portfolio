"use client";

import { motion } from "framer-motion";

export default function GlassCard({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl shadow-lg p-6"
    >
      {children}
    </motion.div>
  );
}