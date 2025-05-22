"use client";



import ContactForm from './ContactForm';
import ParallaxWrapper from '../animations/ParallaxWrapper';
import { motion } from 'framer-motion';

export default function Contact() {
  return (
    <section id="contact" className="py-16 bg-secondary">
      <div className="max-w-md mx-auto px-4">
        <ParallaxWrapper offset={50}>
          <motion.h2
            className="text-4xl font-display text-center mb-8"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Get in Touch
          </motion.h2>
        </ParallaxWrapper>
        <ParallaxWrapper offset={30}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <ContactForm />
          </motion.div>
        </ParallaxWrapper>
      </div>
    </section>
  );
}