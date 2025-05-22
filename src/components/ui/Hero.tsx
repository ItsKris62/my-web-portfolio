'use client';
import ParallaxWrapper from '../animations/ParallaxWrapper';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import Image from 'next/image';

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/assets/pattern-1.png')" }}
    >
      {/* Background Image with Parallax */}
      <ParallaxWrapper offset={150} startOffset={-300} endOffset={300}>
        <div className="absolute inset-0 flex items-center justify-center">
          <Image
            src="/images/myself.gng"
            alt="Christopher Rateng"
            fill
            className="object-contain grayscale"
            priority
          />
        </div>
      </ParallaxWrapper>

      {/* Overlay for Contrast */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Content */}
      <div className="relative z-10 text-center text-white">
        {/* Stats */}
        <div className="flex justify-center gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-4xl font-bold">3+</p>
            <p className="text-sm">Years Experience</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="text-4xl font-bold">5+</p>
            <p className="text-sm">Projects Completed</p>
          </motion.div>
        </div>

        {/* Greeting */}
        <ParallaxWrapper offset={80} startOffset={-200} endOffset={200}>
          <h1 className="text-7xl md:text-9xl font-display">Hello</h1>
        </ParallaxWrapper>
        <ParallaxWrapper offset={40} startOffset={-150} endOffset={150}>
          <p className="text-xl md:text-2xl font-sans mt-4">
            I’m Christopher Rateng — IT Systems Engineer & Web Developer
          </p>
        </ParallaxWrapper>

        {/* Download Button */}
        <motion.a
          href="/assets/resume.pdf"
          download
          className="inline-flex items-center mt-8 px-6 py-3 bg-primary text-primary-foreground rounded-lg shadow-lg"
          whileHover={{ scale: 1.1, boxShadow: '0 0 15px rgba(39, 135, 131, 0.5)' }}
          whileTap={{ scale: 0.9 }}
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <Download className="mr-2" />
          Download Resume
        </motion.a>

        {/* Scroll Down Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <p className="text-sm">Scroll down</p>
          <svg className="w-6 h-6 mx-auto mt-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </div>
    </section>
  );
}