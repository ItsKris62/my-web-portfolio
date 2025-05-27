"use client";
import { motion } from "framer-motion";
import ParallaxWrapper from "../animations/ParallaxWrapper";

// Experience data
const experiences = [
  {
    role: "IT Support Lead",
    company: "Net Scaling Solutions, LLC",
    period: "08/2023 – Present",
    location: "Maryland, USA",
    achievements: [
      "Led a team of 3 IT support technicians, reducing ticket resolution time by 20% through process optimization and training.",
      "Implemented a Remote Monitoring & Management (RMM) system, resulting in a 25% decrease in system downtime and a 15% improvement in system stability.",
      "Managed Microsoft 365 for 100+ users, ensuring 99.9% uptime and compliance with security policies.",
      "Configured VLANs and wireless networks for 5+ buildings remotely, improving network performance and user satisfaction.",
    ],
  },
  {
    role: "IT Support Engineer",
    company: "Sledge Group Enterprises",
    period: "10/2020 – 08/2023",
    location: "Nairobi, Kenya",
    achievements: [
      "Provided technical support for 100+ users, achieving a 95% satisfaction rate and resolving issues within an average of 30 minutes.",
      "Configured Layer 3 switches, reducing network downtime by 15% and improving data transfer speeds by 20%.",
      "Implemented IP PBX systems for 50+ extensions, ensuring 99.9% call quality through QoS configurations.",
    ],
  },
];

// Animation variants
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
  scale: 1.03,
  boxShadow: "0 10px 30px rgba(40, 135, 131, 0.2)", // Using Deep Aqua for shadow
  transition: { type: "spring", stiffness: 300 },
};

const Experience = () => {
  return (
    <section id="experience" className="py-24 bg-[#FFEBD0] relative overflow-hidden">
      {/* Subtle Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FFEBD0] via-[#FFEBD0]/80 to-[#4AB8B3]/10"></div>

      {/* Organic Pattern Overlay */}
      <ParallaxWrapper offset={100}>
        <div className="absolute inset-0 opacity-15">
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
      </ParallaxWrapper>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <ParallaxWrapper offset={50}>
          <motion.div
            className="text-center mb-16"
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
              My Professional Journey
            </motion.h2>
            <motion.p
              className="text-[#278783]/80 text-lg max-w-2xl mx-auto font-['Inter']"
              variants={itemVariants}
            >
              Key milestones in my career as an IT professional
            </motion.p>
            <motion.div
              className="w-20 h-0.5 bg-[#4AB8B3] mx-auto mt-4 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: 80 }}
              transition={{ duration: 0.8 }}
            />
          </motion.div>
        </ParallaxWrapper>

        {/* Timeline Layout */}
        <div className="relative">
          {/* Timeline Line */}
          <motion.div
            className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-[#4AB8B3]/30 rounded-full"
            style={{ height: "100%" }}
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
          />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <ParallaxWrapper key={index} offset={30 + index * 10}>
                <motion.div
                  className={`relative flex items-center ${index % 2 === 0 ? "flex-row-reverse" : "flex-row"} gap-8`}
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {/* Timeline Node */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-[#4AB8B3] rounded-full border-4 border-[#FFEBD0] shadow-md z-10">
                    <motion.div
                      className="w-full h-full bg-[#278783] rounded-full"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    />
                  </div>

                  {/* Experience Card */}
                  <motion.div
                    className={`w-full md:w-1/2 ${index % 2 === 0 ? "md:ml-auto md:pl-8" : "md:mr-auto md:pr-8"} bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-[#4AB8B3]/20`}
                    whileHover={hoverEffect}
                    whileTap={{ scale: 0.98 }}
                  >
                    <h3 className="text-xl font-['Playfair_Display'] text-[#278783]">{exp.role}</h3>
                    <p className="text-sm text-[#278783]/70 font-['Inter'] mt-1">
                      {exp.company} | {exp.period} | {exp.location}
                    </p>
                    <ul className="mt-4 space-y-2 text-[#278783] font-['Inter']">
                      {exp.achievements.map((achievement, i) => (
                        <motion.li
                          key={i}
                          className="flex items-start gap-2"
                          initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: i * 0.1 }}
                        >
                          <span className="text-[#4AB8B3] mt-1">•</span>
                          <span>{achievement}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>

                  {/* Spacer to balance the layout */}
                  <div className="hidden md:block w-1/2"></div>
                </motion.div>
              </ParallaxWrapper>
            ))}
          </div>
        </div>
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

export default Experience;