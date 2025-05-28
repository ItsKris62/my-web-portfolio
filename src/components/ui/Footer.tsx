"use client";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faWhatsapp,
  faCodepen,
  faOrcid,
  faStackOverflow,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faPhone, faLocationDot, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import ParallaxWrapper from "../animations/ParallaxWrapper";
import { useEffect, useState } from "react";

// Define animation variants for sections
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

// Social and contact link animations
const linkHover = {
  scale: 1.1,
  rotate: 5,
  transition: { type: "spring", stiffness: 300 },
};

const Footer = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const socialLinks = [
    { icon: faGithub, href: "https://github.com/ItsKris62", label: "GitHub", color: "#333" },
    { icon: faLinkedin, href: "https://linkedin.com/in/crateng13", label: "LinkedIn", color: "#0077B5" },
    { icon: faCodepen, href: "https://codepen.io/ItsKris62", label: "CodePen", color: "#000" },
    { icon: faStackOverflow, href: "https://stackoverflow.com/users/ItsKris62", label: "StackOverflow", color: "#F58025" },
    { icon: faOrcid, href: "https://orcid.org/0000-0002-1825-0097", label: "ORCID", color: "#A6CE39" },
  ];

  const contactInfo = [
    { icon: faEnvelope, href: "mailto:crateng13@gmail.com", text: "crateng13@gmail.com", label: "Email" },
    { icon: faPhone, href: "tel:+254725841465", text: "+254 725 841 465", label: "Phone" },
    { icon: faWhatsapp, href: "https://wa.me/+254725841465", text: "WhatsApp", label: "WhatsApp" },
    { icon: faLocationDot, href: "#", text: "Nairobi, Kenya", label: "Location" },
  ];

  const quickLinks = [
    { name: "About", href: "#summary" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  const scrollToTop = () => {
    if (typeof window === 'undefined') return;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!isMounted) {
    return (
      <footer className="relative bg-[#1A5F5B] text-[#FFEBD0] py-12 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="h-8 bg-gray-200 rounded animate-pulse mx-auto w-48 mb-4" />
            <div className="h-4 bg-gray-200 rounded animate-pulse mx-auto w-64" />
          </div>
        </div>
      </footer>
    );
  }

  return (
    <ParallaxWrapper offset={20}>
      <motion.footer
        className="relative bg-[#1A5F5B] text-[#FFEBD0] py-12 px-6 overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={containerVariants}
      >
        {/* Subtle Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1A5F5B] via-[#278783]/50 to-[#4AB8B3]/30"></div>

        {/* Refined Organic Pattern Overlay */}
        <div className="absolute inset-0 opacity-15">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="organic-pattern" x="0" y="0" width="15" height="15" patternUnits="userSpaceOnUse">
                <circle cx="7.5" cy="7.5" r="1.5" fill="#FFEBD0" opacity="0.3" />
                <circle cx="3" cy="3" r="0.8" fill="#FFEBD0" opacity="0.2" />
                <circle cx="12" cy="12" r="0.8" fill="#FFEBD0" opacity="0.2" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#organic-pattern)" />
          </svg>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Header Section */}
          <motion.div className="text-center mb-12" variants={itemVariants}>
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-[#FFEBD0] mb-3 font-['Playfair_Display']"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              Christopher Rateng
            </motion.h2>
            <motion.p
              className="text-[#FFEBD0]/80 text-base max-w-xl mx-auto font-['Inter']"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              IT Systems Engineer & Web Developer | Crafting Solutions with Precision
            </motion.p>
            <motion.div
              className="w-16 h-0.5 bg-[#4AB8B3] mx-auto mt-4 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: 64 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            />
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Contact Information */}
            <motion.div className="space-y-4" variants={itemVariants}>
              <h3 className="text-xl font-['Playfair_Display'] text-[#FFEBD0] mb-4 flex items-center">
                <span className="w-8 h-8 bg-[#4AB8B3] rounded-md flex items-center justify-center mr-2">
                  <FontAwesomeIcon icon={faEnvelope} className="text-[#1A5F5B] text-sm" />
                </span>
                Get in Touch
              </h3>
              {contactInfo.map((contact) => (
                <motion.a
                  key={contact.label}
                  href={contact.href}
                  className="flex items-center p-2 rounded-lg hover:bg-[#4AB8B3]/20 transition-all duration-300 group border border-[#4AB8B3]/10"
                  whileHover={linkHover}
                  whileTap={{ scale: 0.95 }}
                  aria-label={contact.label}
                >
                  <div className="w-9 h-9 bg-[#4AB8B3]/30 rounded-md flex items-center justify-center mr-3 group-hover:bg-[#4AB8B3]/50 transition-all">
                    <FontAwesomeIcon icon={contact.icon} className="text-[#FFEBD0] group-hover:text-[#FFEBD0]/90" />
                  </div>
                  <div>
                    <p className="text-[#FFEBD0]/70 text-xs font-['Inter']">{contact.label}</p>
                    <p className="text-[#FFEBD0] font-['Inter']">{contact.text}</p>
                  </div>
                </motion.a>
              ))}
            </motion.div>

            {/* Social Links */}
            <motion.div className="space-y-4" variants={itemVariants}>
              <h3 className="text-xl font-['Playfair_Display'] text-[#FFEBD0] mb-4 flex items-center">
                <span className="w-8 h-8 bg-[#4AB8B3] rounded-md flex items-center justify-center mr-2">
                  <FontAwesomeIcon icon={faGithub} className="text-[#1A5F5B] text-sm" />
                </span>
                Connect with Me
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-2 rounded-lg hover:bg-[#4AB8B3]/20 transition-all duration-300 group border border-[#4AB8B3]/10"
                    whileHover={linkHover}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, rotateX: -15 }}
                    whileInView={{ opacity: 1, rotateX: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.4 }}
                    aria-label={link.label}
                  >
                    <FontAwesomeIcon
                      icon={link.icon}
                      className="text-xl mr-2 group-hover:scale-110 transition-transform duration-300 text-[#FFEBD0] group-hover:text-[#4AB8B3]"
                    />
                    <span className="text-[#FFEBD0] font-['Inter'] group-hover:text-[#FFEBD0]/90">{link.label}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Quick Navigation */}
            <motion.div className="space-y-4" variants={itemVariants}>
              <h3 className="text-xl font-['Playfair_Display'] text-[#FFEBD0] mb-4 flex items-center">
                <span className="w-8 h-8 bg-[#4AB8B3] rounded-md flex items-center justify-center mr-2">
                  <FontAwesomeIcon icon={faArrowUp} className="text-[#1A5F5B] text-sm" />
                </span>
                Quick Navigation
              </h3>
              <div className="space-y-2">
                {quickLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    className="block p-2 rounded-lg hover:bg-[#4AB8B3]/20 transition-all duration-300 group border border-transparent hover:border-[#4AB8B3]/20"
                    whileHover={{ x: 8, backgroundColor: "#4AB8B3", opacity: 0.2 }}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.4 }}
                    aria-label={`Navigate to ${link.name} section`}
                  >
                    <span className="text-[#FFEBD0] font-['Inter'] group-hover:text-[#FFEBD0]/90">{link.name}</span>
                    <motion.div
                      className="h-0.5 bg-[#4AB8B3] w-0 group-hover:w-full transition-all duration-300"
                      initial={{ width: 0 }}
                      whileHover={{ width: "100%" }}
                    />
                  </motion.a>
                ))}
              </div>
              <motion.button
                onClick={scrollToTop}
                className="w-full mt-6 py-3 bg-[#4AB8B3] rounded-lg text-[#1A5F5B] font-['Inter'] font-semibold hover:bg-[#4AB8B3]/80 transition-all shadow-md hover:shadow-lg border border-[#4AB8B3]/20"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                aria-label="Scroll back to top"
              >
                <FontAwesomeIcon icon={faArrowUp} className="mr-2" />
                Back to Top
              </motion.button>
            </motion.div>
          </div>

          {/* Bottom Section */}
          <motion.div
            className="mt-12 pt-6 border-t border-[#4AB8B3]/20 text-center"
            variants={itemVariants}
          >
            <motion.p
              className="text-[#FFEBD0]/70 text-sm font-['Inter'] mb-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              © {new Date().getFullYear()} Christopher Rateng. All rights reserved.
            </motion.p>
            <motion.div
              className="flex justify-center space-x-4 text-xs text-[#FFEBD0]/60 font-['Inter']"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
            >
              <span>Built with React & Tailwind CSS</span>
              <span>|</span>
              <span>Designed in Nairobi, Kenya</span>
            </motion.div>
          </motion.div>
        </div>

        {/* Subtle Particle Animation */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(10)].map((_, i) => (
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
      </motion.footer>
    </ParallaxWrapper>
  );
};

export default Footer;