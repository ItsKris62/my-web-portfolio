"use client";
import { motion, useInView } from "framer-motion";
import { useState, useRef } from "react";
import ParallaxWrapper from "../animations/ParallaxWrapper";

// Skill data with improved categorization
const skills = {
  technical: [
    { name: "Network Configuration", level: 95, category: "networking", icon: "🌐" },
    { name: "IP PBX Systems", level: 90, category: "systems", icon: "📞" },
    { name: "QoS Management", level: 88, category: "networking", icon: "⚡" },
    { name: "Firewall Management", level: 92, category: "security", icon: "🛡️" },
    { name: "ELK Stack Monitoring", level: 85, category: "monitoring", icon: "📊" },
    { name: "Microsoft 365", level: 93, category: "cloud", icon: "☁️" },
    { name: "Active Directory", level: 89, category: "systems", icon: "🏢" },
    { name: "RMM Tools", level: 87, category: "monitoring", icon: "🔧" },
    { name: "Automation", level: 84, category: "development", icon: "🤖" },
    { name: "System Administration", level: 91, category: "systems", icon: "⚙️" },
    { name: "Troubleshooting", level: 96, category: "support", icon: "🔍" },
    { name: "Asset Management", level: 86, category: "management", icon: "📋" },
    { name: "Documentation", level: 88, category: "management", icon: "📝" },
    { name: "Project Management", level: 85, category: "management", icon: "📈" },
  ],
  soft: [
    { name: "Leadership", level: 92, icon: "👑" },
    { name: "Team Management", level: 89, icon: "👥" },
    { name: "Problem-Solving", level: 95, icon: "🧩" },
    { name: "Communication", level: 91, icon: "💬" },
    { name: "Attention to Detail", level: 94, icon: "🎯" },
  ],
  tools: [
    { name: "Lucidchart", category: "design", icon: "🎨" },
    { name: "Cisco Packet Tracer", category: "networking", icon: "🔌" },
    { name: "CCTV Design Tool", category: "security", icon: "📹" },
    { name: "TP-Link", category: "hardware", icon: "📡" },
    { name: "Ubiquiti", category: "hardware", icon: "📶" },
    { name: "pfSense", category: "security", icon: "🔒" },
    { name: "ELK Stack", category: "monitoring", icon: "📈" },
    { name: "AnyDesk", category: "remote", icon: "🖥️" },
    { name: "Team Viewer", category: "remote", icon: "👁️" },
    { name: "LTS", category: "monitoring", icon: "⏰" },
    { name: "Insight", category: "analytics", icon: "💡" },
    { name: "Google Workspace", category: "productivity", icon: "🌈" },
    { name: "Microsoft 365", category: "productivity", icon: "🔵" },
  ],
};

// Updated category colors using your palette
const categoryColors = {
  networking: "from-[#278783] to-[#4AB8B3]",
  systems: "from-[#1A5F5B] to-[#278783]",
  security: "from-[#4AB8B3] to-[#278783]",
  monitoring: "from-[#278783] to-[#1A5F5B]",
  cloud: "from-[#4AB8B3] to-[#1A5F5B]",
  development: "from-[#278783] to-[#4AB8B3]",
  support: "from-[#1A5F5B] to-[#4AB8B3]",
  management: "from-[#4AB8B3] to-[#278783]",
  design: "from-[#278783] to-[#1A5F5B]",
  hardware: "from-[#1A5F5B] to-[#278783]",
  remote: "from-[#4AB8B3] to-[#1A5F5B]",
  analytics: "from-[#278783] to-[#4AB8B3]",
  productivity: "from-[#1A5F5B] to-[#4AB8B3]",
};

// Animation variants for container and items
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
  hidden: { opacity: 0, y: 30, scale: 0.9 },
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

// Hover animation for cards
const hoverEffect = {
  scale: 1.05,
  rotate: 2,
  boxShadow: "0 10px 20px rgba(74, 184, 179, 0.2)",
  transition: { type: "spring", stiffness: 300 },
};

const Skills = () => {
  const [activeView, setActiveView] = useState("radar");
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-50px" });

  // Radar Chart Component with enhanced animations
  const RadarChart = ({ skills }: { skills: any[] }) => {
    const centerX = 150;
    const centerY = 150;
    const radius = 120;
    const levels = 5;
    const angleStep = (2 * Math.PI) / skills.length;

    return (
      <div className="relative">
        <svg width="300" height="300" className="mx-auto">
          {/* Background circles with subtle glow */}
          {[...Array(levels)].map((_, i) => (
            <motion.circle
              key={i}
              cx={centerX}
              cy={centerY}
              r={(radius / levels) * (i + 1)}
              fill="none"
              stroke="#4AB8B3"
              strokeOpacity="0.2"
              strokeWidth="1.5"
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : { scale: 0 }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
            />
          ))}
          
          {/* Grid lines with fade-in effect */}
          {skills.map((_, i) => {
            const angle = i * angleStep - Math.PI / 2;
            const x2 = centerX + Math.cos(angle) * radius;
            const y2 = centerY + Math.sin(angle) * radius;
            return (
              <motion.line
                key={i}
                x1={centerX}
                y1={centerY}
                x2={x2}
                y2={y2}
                stroke="#4AB8B3"
                strokeOpacity="0.2"
                strokeWidth="1.5"
                initial={{ pathLength: 0 }}
                animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
                transition={{ duration: 0.6, delay: i * 0.05, ease: "easeOut" }}
              />
            );
          })}
          
          {/* Skill polygon with animated fill */}
          <motion.polygon
            points={skills.map((skill, i) => {
              const angle = i * angleStep - Math.PI / 2;
              const distance = (skill.level / 100) * radius;
              const x = centerX + Math.cos(angle) * distance;
              const y = centerY + Math.sin(angle) * distance;
              return `${x},${y}`;
            }).join(" ")}
            fill="rgba(74, 184, 179, 0.3)"
            stroke="#4AB8B3"
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
          
          {/* Skill points with pop effect */}
          {skills.map((skill, i) => {
            const angle = i * angleStep - Math.PI / 2;
            const distance = (skill.level / 100) * radius;
            const x = centerX + Math.cos(angle) * distance;
            const y = centerY + Math.sin(angle) * distance;
            return (
              <motion.circle
                key={i}
                cx={x}
                cy={y}
                r="5"
                fill="#FFEBD0"
                stroke="#278783"
                strokeWidth="2"
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : { scale: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1, type: "spring", stiffness: 200 }}
                whileHover={{ scale: 1.5, fill: "#4AB8B3" }}
              />
            );
          })}
        </svg>
        
        {/* Labels with fade-in and slight rotation */}
        <div className="absolute inset-0">
          {skills.map((skill, i) => {
            const angle = i * angleStep - Math.PI / 2;
            const labelDistance = radius + 35;
            const x = centerX + Math.cos(angle) * labelDistance;
            const y = centerY + Math.sin(angle) * labelDistance;
            return (
              <motion.div
                key={i}
                className="absolute text-xs text-[#278783] font-['Inter'] whitespace-nowrap"
                style={{
                  left: `${x}px`,
                  top: `${y}px`,
                  transform: "translate(-50%, -50%)",
                }}
                initial={{ opacity: 0, scale: 0, rotate: -10 }}
                animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1, type: "spring", stiffness: 150 }}
              >
                {skill.name}
              </motion.div>
            );
          })}
        </div>
      </div>
    );
  };

  // Hexagon Grid Component with improved hover effects
  const HexagonGrid = ({ skills }: { skills: any[] }) => {
    return (
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-6 max-w-5xl mx-auto">
        {skills.map((skill, i) => (
          <motion.div
            key={i}
            className="relative group"
            initial={{ opacity: 0, scale: 0, rotate: 45 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.05, type: "spring", stiffness: 200 }}
            whileHover={hoverEffect}
          >
            <div className="w-16 h-16 bg-[#1A5F5B] rounded-xl rotate-45 flex items-center justify-center group-hover:bg-[#4AB8B3] transition-all duration-300 shadow-md">
              <div className="-rotate-45 text-center">
                <div className="text-xl mb-1 text-[#FFEBD0]">{skill.icon}</div>
                <div className="text-[10px] text-[#FFEBD0]/80 font-['Inter'] leading-tight">
                  {skill.name.split(" ")[0]}
                </div>
              </div>
            </div>
            <motion.div
              className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-[#278783] text-[#FFEBD0] px-2 py-1 rounded text-[10px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg z-10 font-['Inter']"
            >
              {skill.name}
            </motion.div>
          </motion.div>
        ))}
      </div>
    );
  };

  // Skill Bars Component with gradient fill and tooltip
  const SkillBars = ({ skills }: { skills: any[] }) => {
    return (
      <div className="space-y-5 max-w-3xl mx-auto">
        {skills.map((skill, i) => (
          <motion.div
            key={i}
            className="relative group"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.05 }}
          >
            <div className="flex justify-between items-center mb-1">
              <div className="flex items-center gap-2">
                <span className="text-xl text-[#278783]">{skill.icon}</span>
                <span className="font-medium text-[#278783] font-['Inter']">{skill.name}</span>
              </div>
              <span className="text-xs text-[#278783]/70 font-['Inter']">{skill.level}%</span>
            </div>
            <div className="h-2 bg-[#FFEBD0]/20 rounded-full overflow-hidden">
              <motion.div
                className={`h-full bg-gradient-to-r ${categoryColors[skill.category] || "from-[#278783] to-[#4AB8B3]"} rounded-full`}
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.level}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: i * 0.05, ease: "easeOut" }}
              />
            </div>
            <motion.div
              className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-[#278783] text-[#FFEBD0] px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-['Inter']"
            >
              Proficiency: {skill.level}%
            </motion.div>
          </motion.div>
        ))}
      </div>
    );
  };

  // Floating Cards Component with enhanced floating animation
  const FloatingCards = ({ skills }: { skills: any[] }) => {
    return (
      <div className="relative min-h-80">
        {skills.map((skill, i) => {
          const positions = [
            { top: "15%", left: "10%" },
            { top: "25%", left: "65%" },
            { top: "40%", left: "20%" },
            { top: "55%", left: "75%" },
            { top: "70%", left: "15%" },
            { top: "80%", left: "55%" },
            { top: "20%", left: "85%" },
            { top: "50%", left: "40%" },
          ];
          const position = positions[i % positions.length];
          
          return (
            <motion.div
              key={i}
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
              style={{ top: position.top, left: position.left }}
              initial={{ opacity: 0, scale: 0, rotate: Math.random() * 360 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.15, type: "spring", stiffness: 150 }}
              whileHover={hoverEffect}
              animate={{
                y: [0, -15, 0],
                rotate: [0, 3, -3, 0],
                boxShadow: ["0 5px 15px rgba(74, 184, 179, 0.1)", "0 10px 20px rgba(74, 184, 179, 0.2)", "0 5px 15px rgba(74, 184, 179, 0.1)"],
              }}
              transition={{
                duration: 3 + Math.random(),
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div className="bg-[#1A5F5B]/80 backdrop-blur-sm border border-[#4AB8B3]/20 rounded-xl p-3 text-center shadow-lg hover:bg-[#1A5F5B] transition-all duration-300 min-w-24">
                <div className="text-2xl mb-1 text-[#FFEBD0]">{skill.icon}</div>
                <div className="text-xs font-medium text-[#FFEBD0] font-['Inter']">{skill.name}</div>
              </div>
            </motion.div>
          );
        })}
      </div>
    );
  };

  const viewOptions = [
    { id: "radar", label: "Radar Chart", icon: "📊" },
    { id: "hexagon", label: "Hexagon Grid", icon: "⬢" },
    { id: "bars", label: "Skill Bars", icon: "📈" },
    { id: "floating", label: "Floating Cards", icon: "🎯" },
  ];

  return (
    <section id="skills" className="py-20 bg-[#FFEBD0] relative overflow-hidden" ref={sectionRef}>
      {/* Background Elements with Subtle Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FFEBD0] via-[#FFEBD0]/90 to-[#4AB8B3]/10"></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <ParallaxWrapper offset={40}>
          <motion.div
            className="text-center mb-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-[#278783] mb-3 font-['Playfair_Display']"
              variants={itemVariants}
            >
              Skills & Expertise
            </motion.h2>
            <motion.p
              className="text-[#278783]/80 text-lg max-w-xl mx-auto font-['Inter']"
              variants={itemVariants}
            >
              Explore my technical proficiencies through interactive visualizations
            </motion.p>
            <motion.div
              className="w-20 h-0.5 bg-[#4AB8B3] mx-auto mt-4 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: 80 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </motion.div>
        </ParallaxWrapper>

        {/* View Selector with Hover Effects */}
        <motion.div
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-[#1A5F5B]/20 backdrop-blur-sm rounded-xl p-2 border border-[#4AB8B3]/20 flex gap-2">
            {viewOptions.map((option) => (
              <motion.button
                key={option.id}
                onClick={() => setActiveView(option.id)}
                className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                  activeView === option.id
                    ? "bg-[#4AB8B3] text-[#1A5F5B] shadow-md"
                    : "text-[#278783]/70 hover:text-[#278783] hover:bg-[#4AB8B3]/10"
                } font-['Inter']`}
                whileHover={{ scale: 1.05, backgroundColor: "#4AB8B3", color: "#1A5F5B" }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="mr-2">{option.icon}</span>
                {option.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Skills Display with Transition */}
        <motion.div
          className="min-h-80"
          key={activeView}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {activeView === "radar" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h3 className="text-xl font-['Playfair_Display'] text-[#278783] mb-6 text-center">
                  Technical Skills
                </h3>
                <RadarChart skills={skills.technical.slice(0, 8)} />
              </div>
              <div>
                <h3 className="text-xl font-['Playfair_Display'] text-[#278783] mb-6 text-center">
                  Soft Skills
                </h3>
                <RadarChart skills={skills.soft} />
              </div>
            </div>
          )}

          {activeView === "hexagon" && (
            <div className="space-y-12">
              <div>
                <h3 className="text-xl font-['Playfair_Display'] text-[#278783] mb-6 text-center">
                  Tools & Technologies
                </h3>
                <HexagonGrid skills={skills.tools} />
              </div>
            </div>
          )}

          {activeView === "bars" && (
            <div className="space-y-12">
              <div>
                <h3 className="text-xl font-['Playfair_Display'] text-[#278783] mb-6 text-center">
                  Technical Proficiency
                </h3>
                <SkillBars skills={skills.technical} />
              </div>
            </div>
          )}

          {activeView === "floating" && (
            <div>
              <h3 className="text-xl font-['Playfair_Display'] text-[#278783] mb-6 text-center">
                Interactive Skills Map
              </h3>
              <FloatingCards skills={skills.tools.slice(0, 8)} />
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;