import { motion } from 'framer-motion'
import styles from './Hero.module.scss'

export default function Hero() {
  return (
    <section id="hero" className={styles.hero}>
      <motion.h1
        className="text-6xl font-bold text-indigo-400"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Christopher Rateng
      </motion.h1>
      <motion.p
        className="mt-4 text-xl max-w-2xl text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        IT Systems Engineer & Front‑End Developer specializing in network security, Express.js, Figma, and MongoDB. Fluent in Swahili, English, and French.
      </motion.p>
    </section>
  )
}