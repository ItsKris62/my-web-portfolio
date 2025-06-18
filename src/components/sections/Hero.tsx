'use client'

import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import Button from '../ui/Button';
import { SOCIAL } from '@/lib/constants';

// Types
interface FloatingParticle {
  id: number;
  x: number;
  y: number;
}

interface GlitchTextProps {
  children: React.ReactNode;
  className?: string;
}

interface SocialLinkProps {
  href: string;
  label: string;
  ariaLabel: string;
}

interface EnhancedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

// Floating particles component
const FloatingParticles: React.FC = () => {
  const [particles, setParticles] = useState<FloatingParticle[]>([]);

  useEffect(() => {
    const particleArray: FloatingParticle[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
      y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
    }));
    setParticles(particleArray);
  }, []);
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-30"
          initial={{
            x: particle.x,
            y: particle.y,
          }}
          animate={{
            x: particle.x + Math.random() * 200 - 100,
            y: particle.y + Math.random() * 200 - 100,
          }}
          transition={{
            duration: Math.random() * 20 + 10,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

// Animated background grid
const AnimatedGrid: React.FC = () => (
  <div className="absolute inset-0 opacity-10">
    <svg width="100%" height="100%" className="animate-pulse">
      <defs>
        <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
          <path d="M 50 0 L 0 0 0 50" fill="none" stroke="currentColor" strokeWidth="1"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" className="text-cyan-400" />
    </svg>
  </div>
);

// Glitch text effect component
const GlitchText: React.FC<GlitchTextProps> = ({ children, className = '' }) => {
  return (
    <div className={`relative ${className}`}>
      <span className="relative z-10">{children}</span>
      <span 
        className="absolute inset-0 text-red-500 animate-pulse opacity-70"
        style={{ 
          clipPath: 'inset(0 0 95% 0)',
          animation: 'glitch-1 2s infinite linear alternate-reverse'
        }}
      >
        {children}
      </span>
      <span 
        className="absolute inset-0 text-cyan-400 animate-pulse opacity-70"
        style={{ 
          clipPath: 'inset(85% 0 0 0)',
          animation: 'glitch-2 3s infinite linear alternate-reverse'
        }}
      >
        {children}
      </span>
      <style jsx>{`
        @keyframes glitch-1 {
          0%, 14%, 15%, 49%, 50%, 99%, 100% { transform: translateX(0); }
          1%, 13% { transform: translateX(-2px); }
          16%, 48% { transform: translateX(2px); }
        }
        @keyframes glitch-2 {
          0%, 20%, 21%, 62%, 63%, 99%, 100% { transform: translateX(0); }
          1%, 19% { transform: translateX(2px); }
          22%, 61% { transform: translateX(-2px); }
        }
      `}</style>
    </div>
  );
};

// Morphing geometric shapes
const MorphingShapes: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute top-20 left-20 w-32 h-32 border border-cyan-400 opacity-20"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.2, 1],
          borderRadius: ["0%", "50%", "0%"],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 opacity-10"
        animate={{
          rotate: [360, 0],
          scale: [1, 0.8, 1.3, 1],
          borderRadius: ["50%", "0%", "50%"],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};

// Social icon with hover effect
const SocialLink: React.FC<SocialLinkProps> = ({ href, label, ariaLabel }) => (
  <motion.a
    href={href}
    aria-label={ariaLabel}
    target="_blank"
    rel="noopener noreferrer"
    className="relative group"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
  >
    <div className="relative px-4 py-2 bg-gradient-to-r from-slate-800 to-slate-700 rounded-lg border border-slate-600 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
      <span className="relative z-10 text-slate-300 group-hover:text-white transition-colors duration-300">
        {label}
      </span>
    </div>
    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-400 to-purple-500 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300 -z-10" />
  </motion.a>
);

// Enhanced button wrapper
const EnhancedButton: React.FC<EnhancedButtonProps> = ({ children, className = '', ...props }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="relative group"
  >
    <Button 
      className={`relative overflow-hidden bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-purple-600 hover:to-pink-600 ${className}`}
      {...props}
    >
      <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 group-active:opacity-30 transition-opacity duration-150" />
      <span className="relative z-10">{children}</span>
    </Button>
    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-400 to-purple-500 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300 -z-10" />
  </motion.div>
);

// Typewriter effect component
const TypewriterText: React.FC<{ text: string; delay?: number }> = ({ text, delay = 1 }) => {
  const [displayText, setDisplayText] = useState<string>('');
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentIndex < text.length) {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }
    }, delay === 1 ? 100 : delay * 1000);

    return () => clearTimeout(timer);
  }, [currentIndex, text, delay]);

  return (
    <span className="border-r-2 border-cyan-400 pr-1">
      {displayText}
    </span>
  );
};

// Scroll indicator component
const ScrollIndicator: React.FC = () => (
  <motion.div
    className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 2, duration: 0.8 }}
  >
    <motion.div
      className="w-6 h-10 border-2 border-slate-400 rounded-full flex justify-center"
      animate={{ opacity: [1, 0.5, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      <motion.div
        className="w-1 h-3 bg-slate-400 rounded-full mt-2"
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </motion.div>
  </motion.div>
);

export default function Hero(): JSX.Element {
  const [mounted, setMounted] = useState<boolean>(false);
  const controls = useAnimation();

  useEffect(() => {
    setMounted(true);
    const animateEntrance = async (): Promise<void> => {
      await controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 1, ease: "easeOut" }
      });
    };
    animateEntrance();
  }, [controls]);

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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const nameVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { 
        duration: 1.2, 
        ease: "easeOut",
        type: "spring",
        stiffness: 100,
      },
    },
  };

  if (!mounted) {
    return <div className="h-screen bg-slate-900" />;
  }

  const subtitleText: string = "IT Systems Engineer | Front-End Developer | Problem Solver";

  return (
    <section id="hero" className="h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Animated background elements */}
      <AnimatedGrid />
      <FloatingParticles />
      <MorphingShapes />
      
      {/* Dynamic gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-pink-500/5" />
      
      {/* Spotlight effect */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "radial-gradient(circle at 20% 50%, transparent 0%, transparent 40%, rgba(15, 23, 42, 0.8) 100%)",
            "radial-gradient(circle at 80% 50%, transparent 0%, transparent 40%, rgba(15, 23, 42, 0.8) 100%)",
            "radial-gradient(circle at 50% 20%, transparent 0%, transparent 40%, rgba(15, 23, 42, 0.8) 100%)",
            "radial-gradient(circle at 50% 80%, transparent 0%, transparent 40%, rgba(15, 23, 42, 0.8) 100%)",
          ]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Main content */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Name with glitch effect */}
        <motion.div variants={nameVariants}>
          <GlitchText className="w-full text-6xl md:text-8xl font-bold bg-gradient-to-r from-white via-cyan-200 to-purple-300 bg-clip-text text-transparent">
            Christopher Rateng
          </GlitchText>
        </motion.div>

        {/* Subtitle with typewriter effect */}
        <motion.div variants={itemVariants} className="mt-6">
          <div className="text-xl md:text-2xl text-slate-300 font-light">
            <TypewriterText text={subtitleText} delay={1} />
          </div>
        </motion.div>

        {/* Enhanced social links */}
        <motion.div variants={itemVariants} className="mt-8 flex flex-wrap gap-4 justify-center">
          <SocialLink 
            href={SOCIAL.linkedin} 
            label="LinkedIn" 
            ariaLabel="Visit Christopher's LinkedIn profile"
          />
          <SocialLink 
            href={SOCIAL.github} 
            label="GitHub" 
            ariaLabel="Visit Christopher's GitHub profile"
          />
          <SocialLink 
            href={`mailto:${SOCIAL.email}`} 
            label="Email" 
            ariaLabel="Send an email to Christopher"
          />
        </motion.div>

        {/* Enhanced CTA button using your Button component */}
        <motion.div variants={itemVariants} className="mt-12">
          <EnhancedButton onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
            View My Projects
          </EnhancedButton>
        </motion.div>

        {/* Scroll indicator */}
        <ScrollIndicator />
      </motion.div>

      {/* Custom styles for advanced effects */}
      <style jsx>{`
        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }
      `}</style>
    </section>
  );
}