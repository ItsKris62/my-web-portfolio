"use client";
import { motion } from "framer-motion";
import ParallaxWrapper from "../animations/ParallaxWrapper";

// Animation variants for the section
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const hoverEffect = {
  scale: 1.02,
  boxShadow: "0 10px 30px rgba(40, 135, 131, 0.2)", // Using Deep Aqua for shadow
  transition: { type: "spring", stiffness: 300 },
};

const Summary = () => {
  return (
    <section id="summary" className="py-20 bg-[#FFEBD0] relative overflow-hidden">
      {/* Subtle Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FFEBD0] via-[#FFEBD0]/80 to-[#4AB8B3]/10"></div>

      {/* Organic Pattern Overlay */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="organic-pattern" x="0" y="0" width="15" height="15" patternUnits="userSpaceOnUse">
              <circle cx="7.5" cy="7.5" r="1.5" fill="#4AB8B3" opacity="0.3" />
              <circle cx="3" cy="3" r="0.8" fill="#4AB8B3" opacity="0.2" />
              <circle cx="12" cy="12" r="0.8" fill="#4AB8B3" opacity="0.2" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#organic-pattern)" />
        </svg>
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <ParallaxWrapper offset={50}>
          <motion.div
            className="text-center mb-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2
              className="text-4xl md:text-5xl font-['Playfair_Display'] text-[#278783] mb-4"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              About Me
            </motion.h2>
            <motion.p
              className="text-[#278783]/80 text-lg max-w-2xl mx-auto font-['Inter']"
              variants={itemVariants}
            >
              A glimpse into my journey as an IT professional
            </motion.p>
            <motion.div
              className="w-20 h-0.5 bg-[#4AB8B3] mx-auto mt-4 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: 80 }}
              transition={{ duration: 0.8 }}
            />
          </motion.div>
        </ParallaxWrapper>

        <ParallaxWrapper offset={30}>
          <motion.div
            className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-[#4AB8B3]/20"
            variants={itemVariants}
            whileHover={hoverEffect}
            whileTap={{ scale: 0.98 }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Profile Image */}
              <motion.div
                className="flex-shrink-0"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <img
                  src="/images/me_official.jpg"
                  alt="Christopher Rateng"
                  className="w-32 h-32 rounded-full border-4 border-[#4AB8B3]/30 shadow-md object-cover"
                />
              </motion.div>
              {/* Summary Text */}
              <div className="text-center md:text-left">
                <p className="text-lg font-['Inter'] text-[#278783] leading-relaxed">
                  I’m a detail-oriented IT professional with over three years of experience in technical support, system administration, and network management. I’ve successfully optimized workflows, reduced downtime by 25%, and enhanced system stability through automation and proactive troubleshooting. Skilled in managing Microsoft 365 for 50+ users and implementing security measures, I thrive in dynamic environments, driving efficiency and innovation.
                </p>
                <motion.a
                  href="#contact"
                  className="inline-block mt-6 px-6 py-2 bg-[#4AB8B3] text-[#1A5F5B] rounded-lg font-['Inter'] font-semibold hover:bg-[#4AB8B3]/80 transition-all shadow-md hover:shadow-lg"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get in Touch
                </motion.a>
              </div>
            </div>
          </motion.div>
        </ParallaxWrapper>
      </div>

      {/* Subtle Particle Animation */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-[#4AB8B3]/50 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -15, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default Summary;