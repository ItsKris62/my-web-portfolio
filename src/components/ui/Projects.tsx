"use client";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import dynamic from 'next/dynamic';

// Define TypeScript interfaces
interface Project {
  title: string;
  description: string;
  type: string;
  category: string;
  image: string;
  tech: string[];
  link: string | null;
}

// Updated project list with diverse categories
const projects: Project[] = [
  // Professional Projects (Websites)
  {
    title: "Cybersecurity Dashboard",
    description: "A dashboard for monitoring network security, built with React and Node.js.",
    type: "Website",
    category: "Professional",
    image: "/projects/cybersecurity-dashboard.jpg",
    tech: ["React", "Node.js", "Tailwind CSS"],
    link: "https://github.com/ItsKris62/cybersecurity-dashboard",
  },
  {
    title: "Portfolio Website",
    description: "My personal portfolio showcasing my skills, built with Next.js and Tailwind CSS.",
    type: "Website",
    category: "Professional",
    image: "/projects/portfolio-website.jpg",
    tech: ["Next.js", "Tailwind CSS", "Framer Motion"],
    link: "https://github.com/ItsKris62/portfolio",
  },
  {
    title: "E-commerce Platform",
    description: "A full-stack e-commerce website for a local business, featuring payment integration.",
    type: "Website",
    category: "Professional",
    image: "/projects/ecommerce-platform.jpg",
    tech: ["React", "Node.js", "Stripe"],
    link: "https://github.com/ItsKris62/ecommerce",
  },

  // Professional Projects (Hardware)
  {
    title: "Network Infrastructure Setup",
    description: "Designed and implemented cabling, networking, and configuration for a multi-building site.",
    type: "Hardware",
    category: "Professional",
    image: "/projects/network-infrastructure.jpg",
    tech: ["VLANs", "Cisco Packet Tracer", "TP-Link"],
    link: null,
  },
  {
    title: "IP CCTV Installation",
    description: "Installed and configured 55 IP CCTV cameras across multiple sites, enhancing security coverage by 30%.",
    type: "Hardware",
    category: "Professional",
    image: "/projects/cctv-installation.jpg",
    tech: ["CCTV Design Tool", "IP Cameras"],
    link: null,
  },

  // School Projects
  {
    title: "Network Simulation",
    description: "A simulated network environment for a small business, created as part of a university project.",
    type: "Simulation",
    category: "School",
    image: "/projects/network-simulation.jpg",
    tech: ["Cisco Packet Tracer", "Wireshark"],
    link: "https://github.com/ItsKris62/network-simulation",
  },

  // Personal Projects
  {
    title: "Personal Blog",
    description: "A blog to share my IT insights and experiences, built with Next.js and Markdown.",
    type: "Website",
    category: "Personal",
    image: "/projects/personal-blog.jpg",
    tech: ["Next.js", "Markdown", "Tailwind CSS"],
    link: "https://github.com/ItsKris62/personal-blog",
  },
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Increased stagger for smoother flow
      delayChildren: 0.4,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8, // Increased duration for smoother animation
      ease: [0.16, 1, 0.3, 1], // Custom cubic-bezier for a natural feel
    },
  },
  exit: {
    opacity: 0,
    y: -40,
    scale: 0.9,
    transition: {
      duration: 0.5,
      ease: [0.7, 0, 0.84, 0], // Smooth exit easing
    },
  },
};

const hoverEffect = {
  scale: 1.05,
  boxShadow: "0 15px 30px rgba(40, 135, 131, 0.3)",
  transition: {
    type: "spring",
    stiffness: 400, // Increased stiffness for a snappier spring
    damping: 20, // Added damping for smoother settling
  },
};

// Dynamically import the project card component with no SSR
const ProjectCard = dynamic(() => Promise.resolve(({ project }: { project: Project }) => {
  const [isMounted, setIsMounted] = useState(false);
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="relative bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border border-[#4AB8B3]/20 shadow-lg">
        <div className="relative h-48 bg-gray-200 animate-pulse" />
        <div className="p-6">
          <div className="h-6 bg-gray-200 rounded animate-pulse mb-2" />
          <div className="h-4 bg-gray-200 rounded animate-pulse mb-4" />
          <div className="h-4 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="relative group"
    >
      <motion.div
        className="relative bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border border-[#4AB8B3]/20 shadow-lg"
        variants={cardVariants}
        whileHover={hoverEffect}
        whileTap={{ scale: 0.98 }}
        layout // Enables smooth repositioning during filter changes
        transition={{ layout: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }}
      >
        {/* Project Image with Overlay */}
        <div className="relative h-48">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            priority={false}
          />
          <motion.div
            className="absolute inset-0 bg-[#278783]/50 flex items-center justify-center opacity-0"
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-[#FFEBD0] font-['Inter'] text-sm">{project.category}</span>
          </motion.div>
        </div>

        {/* Project Details */}
        <div className="p-6">
          <h3 className="text-xl font-['Playfair_Display'] text-[#278783]">{project.title}</h3>
          <p className="text-sm text-[#278783]/70 font-['Inter'] mt-1">{project.type}</p>
          <p className="mt-2 text-[#278783] font-['Inter']">{project.description}</p>

          {/* Tech Stack */}
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tech.map((tech: string, i: number) => (
              <motion.span
                key={i}
                className="px-2 py-1 bg-[#4AB8B3]/20 text-[#278783] text-xs rounded-full font-['Inter']"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              >
                {tech}
              </motion.span>
            ))}
          </div>

          {/* Link (if available) */}
          {project.link && (
            <motion.a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 text-[#4AB8B3] font-['Inter'] hover:underline"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              View Project
            </motion.a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}), { ssr: false });

const Projects = () => {
  const sectionRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);
  const [filter, setFilter] = useState("All");

  const projectTypes = ["All", "Website", "Hardware", "Simulation"];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Fixed filter logic to ensure "All" shows all projects
  const filteredProjects = filter === "All" ? projects : projects.filter((project) => project.type === filter);

  if (!isMounted) {
    return (
      <section className="py-24 bg-[#FFEBD0] relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="h-12 bg-gray-200 rounded animate-pulse mx-auto w-48 mb-4" />
            <div className="h-4 bg-gray-200 rounded animate-pulse mx-auto w-64" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border border-[#4AB8B3]/20 shadow-lg">
                <div className="h-48 bg-gray-200 animate-pulse" />
                <div className="p-6">
                  <div className="h-6 bg-gray-200 rounded animate-pulse mb-2" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse mb-4" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} id="projects" className="py-24 bg-[#FFEBD0] relative overflow-hidden">
      {/* Subtle Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FFEBD0] via-[#FFEBD0]/80 to-[#4AB8B3]/10"></div>

      {/* Organic Pattern Overlay */}
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

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-['Playfair_Display'] text-[#278783] mb-4"
            variants={cardVariants}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            My Projects
          </motion.h2>
          <motion.p
            className="text-[#278783]/80 text-lg max-w-2xl mx-auto font-['Inter']"
            variants={cardVariants}
          >
            A showcase of my diverse work in web development, hardware, and simulations
          </motion.p>
          <motion.div
            className="w-20 h-0.5 bg-[#4AB8B3] mx-auto mt-4 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          />
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="bg-[#1A5F5B]/10 backdrop-blur-md rounded-xl p-2 border border-[#4AB8B3]/20 shadow-md">
            {projectTypes.map((type) => (
              <motion.button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-4 py-2 rounded-lg transition-all duration-300 mx-1 font-['Inter'] ${
                  filter === type
                    ? "bg-[#4AB8B3] text-[#1A5F5B] shadow-lg"
                    : "text-[#278783]/70 hover:text-[#278783] hover:bg-[#4AB8B3]/20"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                {type}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Project Grid with AnimatePresence for smooth transitions */}
        <AnimatePresence mode="wait">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            key={filter} // Key ensures the grid re-renders on filter change
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={containerVariants}
            viewport={{ once: true }}
          >
            {filteredProjects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </motion.div>
        </AnimatePresence>
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
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default Projects;