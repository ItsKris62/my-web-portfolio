'use client'

import { FC, ReactNode } from 'react';
import { motion } from 'framer-motion';

const variants = { hidden: { opacity: 0, y: 60 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
export const FadeInSection: FC<{ children: ReactNode }> = ({ children }) => (
  <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={variants}>{children}</motion.div>
);