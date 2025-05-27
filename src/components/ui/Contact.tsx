"use client";

import ContactForm from './ContactForm';
import ParallaxWrapper from '../animations/ParallaxWrapper';
import { motion } from 'framer-motion';

export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-secondary text-foreground font-metrolin">
      <div className="max-w-lg mx-auto px-6">
        <ParallaxWrapper offset={60}>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-5xl text-Gathen font-bold text-center mb-12 tracking-tight"
          >
            Let’s Connect
          </motion.h2>
        </ParallaxWrapper>

        <ParallaxWrapper offset={40}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <ContactForm />
          </motion.div>
        </ParallaxWrapper>
      </div>
    </section>
  );
}