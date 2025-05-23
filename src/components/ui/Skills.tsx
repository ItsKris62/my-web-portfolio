'use client';
import { motion, useInView } from 'framer-motion';
import { useState, useRef } from 'react';
import ParallaxWrapper from '../animations/ParallaxWrapper';

const skills = {
  technical: [
    { name: 'Network Configuration', level: 95, category: 'networking', icon: '🌐' },
    { name: 'IP PBX Systems', level: 90, category: 'systems', icon: '📞' },
    { name: 'QoS Management', level: 88, category: 'networking', icon: '⚡' },
    { name: 'Firewall Management', level: 92, category: 'security', icon: '🛡️' },
    { name: 'ELK Stack Monitoring', level: 85, category: 'monitoring', icon: '📊' },
    { name: 'Microsoft 365', level: 93, category: 'cloud', icon: '☁️' },
    { name: 'Active Directory', level: 89, category: 'systems', icon: '🏢' },
    { name: 'RMM Tools', level: 87, category: 'monitoring', icon: '🔧' },
    { name: 'Automation', level: 84, category: 'development', icon: '🤖' },
    { name: 'System Administration', level: 91, category: 'systems', icon: '⚙️' },
    { name: 'Troubleshooting', level: 96, category: 'support', icon: '🔍' },
    { name: 'Asset Management', level: 86, category: 'management', icon: '📋' },
    { name: 'Documentation', level: 88, category: 'management', icon: '📝' },
    { name: 'Project Management', level: 85, category: 'management', icon: '📈' },
  ],
  soft: [
    { name: 'Leadership', level: 92, icon: '👑' },
    { name: 'Team Management', level: 89, icon: '👥' },
    { name: 'Problem-Solving', level: 95, icon: '🧩' },
    { name: 'Communication', level: 91, icon: '💬' },
    { name: 'Attention to Detail', level: 94, icon: '🎯' },
  ],
  tools: [
    { name: 'Lucidchart', category: 'design', icon: '🎨' },
    { name: 'Cisco Packet Tracer', category: 'networking', icon: '🔌' },
    { name: 'CCTV Design Tool', category: 'security', icon: '📹' },
    { name: 'TP-Link', category: 'hardware', icon: '📡' },
    { name: 'Ubiquiti', category: 'hardware', icon: '📶' },
    { name: 'pfSense', category: 'security', icon: '🔒' },
    { name: 'ELK Stack', category: 'monitoring', icon: '📈' },
    { name: 'AnyDesk', category: 'remote', icon: '🖥️' },
    { name: 'Team Viewer', category: 'remote', icon: '👁️' },
    { name: 'LTS', category: 'monitoring', icon: '⏰' },
    { name: 'Insight', category: 'analytics', icon: '💡' },
    { name: 'Google Workspace', category: 'productivity', icon: '🌈' },
    { name: 'Microsoft 365', category: 'productivity', icon: '🔵' },
  ],
};

const categoryColors = {
  networking: 'from-blue-500 to-blue-600',
  systems: 'from-green-500 to-green-600',
  security: 'from-red-500 to-red-600',
  monitoring: 'from-purple-500 to-purple-600',
  cloud: 'from-cyan-500 to-cyan-600',
  development: 'from-orange-500 to-orange-600',
  support: 'from-yellow-500 to-yellow-600',
  management: 'from-pink-500 to-pink-600',
  design: 'from-indigo-500 to-indigo-600',
  hardware: 'from-gray-500 to-gray-600',
  remote: 'from-teal-500 to-teal-600',
  analytics: 'from-violet-500 to-violet-600',
  productivity: 'from-emerald-500 to-emerald-600',
};

export default function Skills() {
  const [activeView, setActiveView] = useState('radar');
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, margin: '-100px' });

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
    hidden: { opacity: 0, y: 50, scale: 0.8 },
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

  // Radar Chart Component
  const RadarChart = ({ skills }) => {
    const centerX = 150;
    const centerY = 150;
    const radius = 120;
    const levels = 5;
    
    const angleStep = (2 * Math.PI) / skills.length;
    
    return (
      <div className="relative">
        <svg width="300" height="300" className="mx-auto">
          {/* Background circles */}
          {[...Array(levels)].map((_, i) => (
            <circle
              key={i}
              cx={centerX}
              cy={centerY}
              r={(radius / levels) * (i + 1)}
              fill="none"
              stroke="rgba(74, 184, 179, 0.2)"
              strokeWidth="1"
            />
          ))}
          
          {/* Grid lines */}
          {skills.map((_, i) => {
            const angle = i * angleStep - Math.PI / 2;
            const x2 = centerX + Math.cos(angle) * radius;
            const y2 = centerY + Math.sin(angle) * radius;
            return (
              <line
                key={i}
                x1={centerX}
                y1={centerY}
                x2={x2}
                y2={y2}
                stroke="rgba(74, 184, 179, 0.2)"
                strokeWidth="1"
              />
            );
          })}
          
          {/* Skill polygon */}
          <motion.polygon
            points={skills.map((skill, i) => {
              const angle = i * angleStep - Math.PI / 2;
              const distance = (skill.level / 100) * radius;
              const x = centerX + Math.cos(angle) * distance;
              const y = centerY + Math.sin(angle) * distance;
              return `${x},${y}`;
            }).join(' ')}
            fill="rgba(74, 184, 179, 0.3)"
            stroke="#4AB8B3"
            strokeWidth="2"
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
          
          {/* Skill points */}
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
                r="4"
                fill="#FFEBD0"
                stroke="#278783"
                strokeWidth="2"
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : { scale: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              />
            );
          })}
        </svg>
        
        {/* Labels */}
        <div className="absolute inset-0">
          {skills.map((skill, i) => {
            const angle = i * angleStep - Math.PI / 2;
            const labelDistance = radius + 30;
            const x = centerX + Math.cos(angle) * labelDistance;
            const y = centerY + Math.sin(angle) * labelDistance;
            return (
              <motion.div
                key={i}
                className="absolute text-xs text-primary font-mono whitespace-nowrap"
                style={{
                  left: `${x}px`,
                  top: `${y}px`,
                  transform: 'translate(-50%, -50%)',
                  fontFamily: 'Metrolin, monospace'
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                {skill.name}
              </motion.div>
            );
          })}
        </div>
      </div>
    );
  };

  // Hexagon Grid Component
  const HexagonGrid = ({ skills }) => {
    return (
      <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 max-w-4xl mx-auto">
        {skills.map((skill, i) => (
          <motion.div
            key={i}
            className="relative group"
            initial={{ opacity: 0, scale: 0, rotate: -180 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.05 }}
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-2xl rotate-45 flex items-center justify-center group-hover:from-accent group-hover:to-secondary transition-all duration-300 shadow-lg">
              <div className="-rotate-45 text-center">
                <div className="text-2xl mb-1">{skill.icon}</div>
                <div className="text-xs text-primary-foreground font-mono leading-tight" style={{ fontFamily: 'Metrolin, monospace' }}>
                  {skill.name.split(' ')[0]}
                </div>
              </div>
            </div>
            <motion.div
              className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-card text-card-foreground px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg z-10"
              style={{ fontFamily: 'Gathen, sans-serif' }}
            >
              {skill.name}
            </motion.div>
          </motion.div>
        ))}
      </div>
    );
  };

  // Skill Bars Component
  const SkillBars = ({ skills }) => {
    return (
      <div className="space-y-6 max-w-3xl mx-auto">
        {skills.map((skill, i) => (
          <motion.div
            key={i}
            className="relative"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
          >
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{skill.icon}</span>
                <span className="font-medium text-primary" style={{ fontFamily: 'Gathen, sans-serif' }}>{skill.name}</span>
              </div>
              <span className="text-sm text-primary/70 font-mono" style={{ fontFamily: 'Metrolin, monospace' }}>{skill.level}%</span>
            </div>
            <div className="h-3 bg-muted rounded-full overflow-hidden">
              <motion.div
                className={`h-full bg-gradient-to-r ${categoryColors[skill.category] || 'from-accent to-primary'} rounded-full`}
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.level}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    );
  };

  // Floating Cards Component
  const FloatingCards = ({ skills }) => {
    return (
      <div className="relative min-h-96">
        {skills.map((skill, i) => {
          const positions = [
            { top: '10%', left: '15%' },
            { top: '20%', left: '60%' },
            { top: '35%', left: '25%' },
            { top: '50%', left: '70%' },
            { top: '65%', left: '10%' },
            { top: '75%', left: '50%' },
            { top: '15%', left: '80%' },
            { top: '45%', left: '45%' },
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
              transition={{ duration: 0.8, delay: i * 0.2 }}
              whileHover={{ 
                scale: 1.1, 
                rotate: Math.random() * 20 - 10,
                zIndex: 10
              }}
              animate={{
                y: [0, -10, 0],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div className="bg-card/80 backdrop-blur-sm border border-accent/20 rounded-2xl p-4 text-center shadow-lg hover:shadow-xl transition-shadow duration-300 min-w-24">
                <div className="text-3xl mb-2">{skill.icon}</div>
                <div className="text-sm font-medium text-card-foreground" style={{ fontFamily: 'Gathen, sans-serif' }}>
                  {skill.name}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    );
  };

  const viewOptions = [
    { id: 'radar', label: 'Radar Chart', icon: '📊' },
    { id: 'hexagon', label: 'Hexagon Grid', icon: '⬢' },
    { id: 'bars', label: 'Skill Bars', icon: '📈' },
    { id: 'floating', label: 'Floating Cards', icon: '🎯' },
  ];

  return (
    <section id="skills" className="py-20 bg-secondary relative overflow-hidden" ref={sectionRef}>
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl"
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
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl"
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
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <ParallaxWrapper offset={50}>
          <motion.div
            className="text-center mb-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2 
              className="text-5xl md:text-6xl font-bold text-primary mb-4"
              style={{ fontFamily: 'Castely, serif' }}
              variants={itemVariants}
            >
              Skills & Expertise
            </motion.h2>
            <motion.p 
              className="text-primary/70 text-lg max-w-2xl mx-auto"
              style={{ fontFamily: 'Gathen, sans-serif' }}
              variants={itemVariants}
            >
              Explore my technical proficiencies through interactive visualizations
            </motion.p>
            <motion.div 
              className="w-24 h-1 bg-accent mx-auto mt-6 rounded-full"
              variants={itemVariants}
            />
          </motion.div>
        </ParallaxWrapper>

        {/* View Selector */}
        <motion.div
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-card/20 backdrop-blur-sm rounded-2xl p-2 border border-accent/20">
            {viewOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => setActiveView(option.id)}
                className={`px-4 py-2 rounded-xl transition-all duration-300 mx-1 ${
                  activeView === option.id
                    ? 'bg-accent text-primary shadow-lg'
                    : 'text-primary/70 hover:text-primary hover:bg-accent/20'
                }`}
                style={{ fontFamily: 'Gathen, sans-serif' }}
              >
                <span className="mr-2">{option.icon}</span>
                {option.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Skills Display */}
        <motion.div
          className="min-h-96"
          key={activeView}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {activeView === 'radar' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-semibold text-primary mb-6 text-center" style={{ fontFamily: 'Castely, serif' }}>
                  Technical Skills
                </h3>
                <RadarChart skills={skills.technical.slice(0, 8)} />
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-primary mb-6 text-center" style={{ fontFamily: 'Castely, serif' }}>
                  Soft Skills
                </h3>
                <RadarChart skills={skills.soft} />
              </div>
            </div>
          )}

          {activeView === 'hexagon' && (
            <div className="space-y-16">
              <div>
                <h3 className="text-2xl font-semibold text-primary mb-8 text-center" style={{ fontFamily: 'Castely, serif' }}>
                  Tools & Technologies
                </h3>
                <HexagonGrid skills={skills.tools} />
              </div>
            </div>
          )}

          {activeView === 'bars' && (
            <div className="space-y-12">
              <div>
                <h3 className="text-2xl font-semibold text-primary mb-8 text-center" style={{ fontFamily: 'Castely, serif' }}>
                  Technical Proficiency
                </h3>
                <SkillBars skills={skills.technical} />
              </div>
            </div>
          )}

          {activeView === 'floating' && (
            <div>
              <h3 className="text-2xl font-semibold text-primary mb-8 text-center" style={{ fontFamily: 'Castely, serif' }}>
                Interactive Skills Map
              </h3>
              <FloatingCards skills={skills.tools.slice(0, 8)} />
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}