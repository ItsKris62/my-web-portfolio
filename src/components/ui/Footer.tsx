'use client';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGithub,
  faWhatsapp,
  faCodepen,
  faOrcid,
  faStackOverflow,
  faLinkedin,
  faPeerlist,
} from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone, faLocationDot, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import ParallaxWrapper from '../animations/ParallaxWrapper';

export default function Footer() {
  const socialLinks = [
    { icon: faGithub, href: 'https://github.com/ItsKris62', label: 'GitHub', color: '#333' },
    { icon: faLinkedin, href: 'https://linkedin.com/in/crateng13', label: 'LinkedIn', color: '#0077B5' },
    { icon: faCodepen, href: 'https://codepen.io/ItsKris62', label: 'CodePen', color: '#000' },
    { icon: faStackOverflow, href: 'https://stackoverflow.com/users/ItsKris62', label: 'StackOverflow', color: '#F58025' },
    { icon: faOrcid, href: 'https://orcid.org/0000-0002-1825-0097', label: 'ORCID', color: '#A6CE39' },
    { icon: faPeerlist, href: 'https://peerlist.io/ItsKris62', label: 'Peerlist', color: '#00AA45' },
  ];

  const contactInfo = [
    { icon: faEnvelope, href: 'mailto:crateng13@gmail.com', text: 'crateng13@gmail.com', label: 'Email' },
    { icon: faPhone, href: 'tel:+254725841465', text: '+254 725 841 465', label: 'Phone' },
    { icon: faWhatsapp, href: 'https://wa.me/+254725841465', text: 'WhatsApp', label: 'WhatsApp' },
    { icon: faLocationDot, href: '#', text: 'Kenya', label: 'Location' },
  ];

  const quickLinks = [
    { name: 'About', href: '#summary' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <ParallaxWrapper offset={30}>
      <motion.footer
        className="relative bg-primary text-primary-foreground overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -top-40 -right-40 w-80 h-80 bg-accent/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          <motion.div
            className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/30 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [360, 180, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
            animate={{
              scale: [0.8, 1.1, 0.8],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        {/* Organic Pattern Overlay */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="organic-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="10" cy="10" r="1" fill="currentColor" opacity="0.3"/>
                <circle cx="5" cy="5" r="0.5" fill="currentColor" opacity="0.2"/>
                <circle cx="15" cy="15" r="0.5" fill="currentColor" opacity="0.2"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#organic-pattern)"/>
          </svg>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-16">
          {/* Header Section */}
          <motion.div 
            className="text-center mb-16"
            variants={itemVariants}
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-secondary mb-4 font-display"
              style={{ fontFamily: 'Castely, serif' }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              Christopher Rateng
            </motion.h2>
            <motion.p 
              className="text-primary-foreground/80 text-lg max-w-2xl mx-auto font-body"
              style={{ fontFamily: 'Gathen, sans-serif' }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Full-Stack Developer & UI/UX Enthusiast crafting digital experiences
            </motion.p>
            <motion.div 
              className="w-24 h-1 bg-accent mx-auto mt-6 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Information */}
            <motion.div 
              className="space-y-6"
              variants={itemVariants}
            >
              <h3 className="text-2xl font-semibold mb-6 flex items-center text-secondary font-display" style={{ fontFamily: 'Castely, serif' }}>
                <span className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center mr-3">
                  <FontAwesomeIcon icon={faEnvelope} className="text-sm text-primary" />
                </span>
                Get In Touch
              </h3>
              <div className="space-y-4">
                {contactInfo.map((contact) => (
                  <motion.a
                    key={contact.label}
                    href={contact.href}
                    className="flex items-center p-3 rounded-xl bg-card/10 hover:bg-card/20 transition-all duration-300 group border border-accent/20 hover:border-accent/40 backdrop-blur-sm"
                    whileHover={{ x: 5, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="w-10 h-10 bg-secondary/20 rounded-lg flex items-center justify-center mr-4 group-hover:bg-accent transition-all duration-300">
                      <FontAwesomeIcon icon={contact.icon} className="text-sm text-secondary group-hover:text-primary" />
                    </div>
                    <div>
                      <p className="text-primary-foreground/70 text-sm font-mono" style={{ fontFamily: 'Metrolin, monospace' }}>{contact.label}</p>
                      <p className="text-primary-foreground font-medium font-body" style={{ fontFamily: 'Gathen, sans-serif' }}>{contact.text}</p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div 
              className="space-y-6"
              variants={itemVariants}
            >
              <h3 className="text-2xl font-semibold mb-6 flex items-center text-secondary font-display" style={{ fontFamily: 'Castely, serif' }}>
                <span className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center mr-3">
                  <FontAwesomeIcon icon={faGithub} className="text-sm text-primary" />
                </span>
                Connect With Me
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-4 rounded-xl bg-card/10 hover:bg-card/20 transition-all duration-300 group border border-accent/20 hover:border-accent/40 backdrop-blur-sm"
                    whileHover={{ 
                      scale: 1.05, 
                      rotateY: 5,
                      boxShadow: "0 10px 30px rgba(74, 184, 179, 0.2)"
                    }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, rotateX: -20 }}
                    whileInView={{ opacity: 1, rotateX: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <FontAwesomeIcon 
                      icon={link.icon} 
                      className="text-2xl mr-3 group-hover:scale-110 transition-transform duration-300 text-accent group-hover:text-secondary"
                    />
                    <span className="text-primary-foreground/80 group-hover:text-primary-foreground transition-colors duration-300 font-medium font-body" style={{ fontFamily: 'Gathen, sans-serif' }}>
                      {link.label}
                    </span>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Quick Navigation */}
            <motion.div 
              className="space-y-6"
              variants={itemVariants}
            >
              <h3 className="text-2xl font-semibold mb-6 flex items-center text-secondary font-display" style={{ fontFamily: 'Castely, serif' }}>
                <span className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center mr-3">
                  <FontAwesomeIcon icon={faArrowUp} className="text-sm text-primary" />
                </span>
                Quick Navigation
              </h3>
              <div className="space-y-3">
                {quickLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    className="block p-3 rounded-xl bg-card/5 hover:bg-card/15 transition-all duration-300 group border border-transparent hover:border-accent/30"
                    whileHover={{ x: 10, backgroundColor: "rgba(255, 235, 208, 0.1)" }}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <span className="text-primary-foreground/80 group-hover:text-primary-foreground transition-colors duration-300 font-medium font-body" style={{ fontFamily: 'Gathen, sans-serif' }}>
                      {link.name}
                    </span>
                    <motion.div 
                      className="w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"
                      initial={{ width: 0 }}
                      whileHover={{ width: "100%" }}
                    />
                  </motion.a>
                ))}
              </div>

              {/* Back to Top Button */}
              <motion.button
                onClick={scrollToTop}
                className="w-full mt-8 p-4 bg-accent rounded-xl text-primary font-semibold hover:bg-accent/90 hover:text-primary transition-all duration-300 shadow-lg hover:shadow-xl border border-accent/20 font-body"
                style={{ fontFamily: 'Gathen, sans-serif' }}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <FontAwesomeIcon icon={faArrowUp} className="mr-2" />
                Back to Top
              </motion.button>
            </motion.div>
          </div>

          {/* Bottom Section */}
          <motion.div 
            className="mt-16 pt-8 border-t border-accent/30 text-center"
            variants={itemVariants}
          >
            <motion.p 
              className="text-primary-foreground/60 mb-4 font-mono"
              style={{ fontFamily: 'Metrolin, monospace' }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              © 2025 Christopher Rateng. Crafted with passion and attention to detail.
            </motion.p>
            <motion.div 
              className="flex justify-center space-x-6 text-sm text-primary-foreground/50 font-mono"
              style={{ fontFamily: 'Metrolin, monospace' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              <span>Made with React & Framer Motion</span>
              <span>•</span>
              <span>Designed in Kenya</span>
            </motion.div>
          </motion.div>
        </div>

        {/* Floating Particles Effect */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-accent/40 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </motion.footer>
    </ParallaxWrapper>
  );
}