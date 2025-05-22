'use client';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';

export default function DownloadButton() {
  return (
    <motion.a
      href="/assets/resume.pdf"
      download
      className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg shadow-lg"
      whileHover={{ scale: 1.1, boxShadow: '0 0 15px rgba(39, 135, 131, 0.5)' }}
      whileTap={{ scale: 0.9 }}
      animate={{ y: [0, -10, 0] }}
      transition={{ repeat: Infinity, duration: 1.5 }}
    >
      <Download className="mr-2" />
      Download Resume
    </motion.a>
  );
}