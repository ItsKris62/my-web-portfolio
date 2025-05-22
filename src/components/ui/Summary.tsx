'use client';
import { motion } from 'framer-motion';
import ParallaxWrapper from '../animations/ParallaxWrapper';

export default function Summary() {
  return (
    <section id="summary" className="py-16 bg-background">
      <div className="max-w-5xl mx-auto px-4">
        <ParallaxWrapper offset={50}>
          <h2 className="text-4xl font-display text-center mb-8">About Me</h2>
        </ParallaxWrapper>
        <ParallaxWrapper offset={30}>
          <motion.div
            className="backdrop-blur-md bg-secondary/10 p-8 rounded-xl shadow-lg border border-secondary/20"
            whileHover={{ scale: 1.02, boxShadow: '0 10px 20px rgba(0,0,0,0.2)' }}
            transition={{ duration: 0.3 }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-lg font-sans text-foreground">
              Detail-oriented IT professional with over three years of experience in technical support, system administration, and network management. Proven ability to optimize workflows, reduce downtime by 25%, and enhance system stability through automation and proactive troubleshooting. Skilled in managing Microsoft 365 for 50+ users and implementing security measures, driving efficiency in dynamic environments.
            </p>
          </motion.div>
        </ParallaxWrapper>
      </div>
    </section>
  );
}