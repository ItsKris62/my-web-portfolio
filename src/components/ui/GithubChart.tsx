"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { format, subDays } from "date-fns"; // For date formatting and manipulation

interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

const GitHubChart = () => {
  const [contributions, setContributions] = useState<ContributionDay[]>([]);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-50px" });

  // Fetch GitHub contribution data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/github");
        const data = await response.json();
        if (data.contributions) {
          setContributions(data.contributions);
        } else {
          // Fallback mock data for demo purposes (remove in production)
          const mockData = Array.from({ length: 365 }, (_, i) => {
            const date = subDays(new Date("2025-05-27"), 364 - i);
            return {
              date: format(date, "yyyy-MM-dd"),
              count: Math.floor(Math.random() * 20),
              level: Math.floor(Math.random() * 5),
            };
          });
          setContributions(mockData);
        }
      } catch (error) {
        console.error("Error fetching GitHub data:", error);
        // Fallback mock data in case of error
        const mockData = Array.from({ length: 365 }, (_, i) => {
          const date = subDays(new Date("2025-05-27"), 364 - i);
          return {
            date: format(date, "yyyy-MM-dd"),
            count: Math.floor(Math.random() * 20),
            level: Math.floor(Math.random() * 5),
          };
        });
        setContributions(mockData);
      }
    };
    fetchData();
  }, []);

  // Animation variants for the section
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.02, // Increased stagger for smoother flow
        delayChildren: 0.4,
      },
    },
  };

  const dayVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6, // Increased duration for smoother animation
        ease: [0.16, 1, 0.3, 1], // Custom cubic-bezier for a natural feel
      },
    },
  };

  const hoverEffect = {
    scale: 1.2,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 20,
    },
  };

  // Smooth scrolling handler
  useEffect(() => {
    const section = document.getElementById("github");
    if (section) {
      section.style.scrollBehavior = "smooth";
      section.style.scrollSnapAlign = "start";
    }
  }, []);

  // Group contributions by weeks for a grid layout
  const weeks = [];
  const daysInWeek = 7;
  for (let i = 0; i < contributions.length; i += daysInWeek) {
    weeks.push(contributions.slice(i, i + daysInWeek));
  }

  // Add month labels
  const monthLabels: { month: string; position: number }[] = [];
  contributions.forEach((day, index) => {
    const date = new Date(day.date);
    if (date.getDate() === 1) {
      const monthName = format(date, "MMM");
      monthLabels.push({ month: monthName, position: Math.floor(index / daysInWeek) });
    }
  });

  // Contribution level colors
  const getColor = (level: number) => {
    switch (level) {
      case 0:
        return "#EDEDED"; // Light gray for no contributions
      case 1:
        return "#B3E1DE"; // Light Aqua with less opacity
      case 2:
        return "#4AB8B3"; // Light Aqua
      case 3:
        return "#278783"; // Deep Aqua
      case 4:
        return "#1A5F5B"; // Dark Aqua
      default:
        return "#1A5F5B";
    }
  };

  return (
    <section id="github" className="py-24 bg-[#FFEBD0] relative overflow-hidden" ref={sectionRef}>
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
            variants={dayVariants}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            GitHub Contributions
          </motion.h2>
          <motion.p
            className="text-[#278783]/80 text-lg max-w-2xl mx-auto font-['Inter']"
            variants={dayVariants}
          >
            A year of coding, visualized through my GitHub activity
          </motion.p>
          <motion.div
            className="w-20 h-0.5 bg-[#4AB8B3] mx-auto mt-4 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          />
        </motion.div>

        {/* Contribution Graph */}
        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-[#4AB8B3]/20 shadow-lg">
          {/* Month Labels */}
          <div className="flex overflow-x-auto scrollbar-thin scrollbar-thumb-[#4AB8B3] scrollbar-track-[#FFEBD0]/50 mb-4">
            {monthLabels.map((label, index) => (
              <div
                key={index}
                className="flex-none text-[#278783]/70 text-xs font-['Inter'] text-center"
                style={{ width: "16px", marginLeft: index === 0 ? "8px" : "0" }}
              >
                {label.month}
              </div>
            ))}
          </div>

          {/* Contribution Grid with Smooth Scrolling */}
          <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-[#4AB8B3] scrollbar-track-[#FFEBD0]/50">
            <motion.div
              className="flex gap-1"
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              {weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-1">
                  {week.map((day, dayIndex) => (
                    <motion.div
                      key={`${weekIndex}-${dayIndex}`}
                      className="w-4 h-4 rounded-sm group relative"
                      style={{ backgroundColor: getColor(day.level) }}
                      variants={dayVariants}
                      whileHover={hoverEffect}
                      whileTap={{ scale: 0.9 }}
                      title={`${day.date}: ${day.count} contributions`}
                    >
                      {/* Tooltip on Hover */}
                      <motion.div
                        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-[#1A5F5B] text-[#FFEBD0] text-xs font-['Inter'] px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 whitespace-nowrap"
                        initial={{ opacity: 0, y: 5 }}
                        whileHover={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      >
                        {day.date}: {day.count} contributions
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              ))}
            </motion.div>
          </div>

          {/* Legend */}
          <div className="flex justify-end mt-4 space-x-2">
            <span className="text-[#278783]/70 text-xs font-['Inter']">Less</span>
            {[0, 1, 2, 3, 4].map((level) => (
              <div key={level} className="w-4 h-4 rounded-sm" style={{ backgroundColor: getColor(level) }} />
            ))}
            <span className="text-[#278783]/70 text-xs font-['Inter']">More</span>
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
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default GitHubChart;