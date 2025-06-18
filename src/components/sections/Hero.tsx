'use client'

import { motion } from 'framer-motion';
import Button from '../ui/Button';
import { SOCIAL } from '@/lib/constants';
export default function Hero() {
  return (
    <section id="hero" className="h-screen relative overflow-hidden bg-background-dark">
      <div className="absolute inset-0 bg-gradient-primary-secondary opacity-30"></div>
      <motion.div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <h1 className="text-6xl md:text-8xl font-serif text-text-primary">Christopher Rateng</h1>
        <p className="mt-4 text-xl md:text-2xl">IT Systems Engineer | Front-End Developer | Problem Solver</p>
        <div className="mt-6 flex space-x-6">
          <a href={SOCIAL.linkedin} aria-label="LinkedIn" target="_blank">LinkedIn</a>
          <a href={SOCIAL.github} aria-label="GitHub" target="_blank">GitHub</a>
          <a href={`mailto:${SOCIAL.email}`} aria-label="Email">Email</a>
        </div>
        <Button className="mt-8">View Projects</Button>
      </motion.div>
    </section>
  );
}