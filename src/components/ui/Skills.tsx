'use client';
import { motion } from 'framer-motion';
import ParallaxWrapper from '../animations/ParallaxWrapper';

const skills = {
  technical: [
    'Network Configuration (VLANs, Wireless)', 'IP PBX Systems', 'QoS', 'Firewall Management (pfSense)', 'Monitoring & Log Analysis (ELK)', 'Microsoft 365', 'Active Directory', 'Remote Monitoring & Management (RMM)', 'Automation', 'System Administration', 'Troubleshooting', 'Asset Management', 'Documentation (Confluence)', 'Project Management (Trello)',
  ],
  soft: ['Leadership', 'Team Management', 'Problem-Solving', 'Communication', 'Attention to Detail'],
  tools: ['Lucidchart', 'Cisco Packet Tracer', 'CCTV Design Tool', 'TP-Link', 'Ubiquiti', 'pfSense', 'ELK Stack', 'AnyDesk', 'Team Viewer', 'LTS', 'Insight', 'Google Application', 'Microsoft 365'],
};

export default function Skills() {
  return (
    <section id="skills" className="py-16 bg-secondary">
      <div className="max-w-5xl mx-auto px-4">
        <ParallaxWrapper offset={50}>
          <h2 className="text-4xl font-display text-center mb-8">Skills</h2>
        </ParallaxWrapper>
        <div className="space-y-8">
          {Object.entries(skills).map(([category, items], index) => (
            <ParallaxWrapper key={category} offset={30 + index * 10}>
              <div>
                <h3 className="text-2xl font-display capitalize mb-4">{category} Skills</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {items.map((skill, idx) => (
                    <motion.div
                      key={idx}
                      className="p-4 rounded-lg bg-white/5 border border-white/10 text-center"
                      whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 235, 208, 0.1)' }}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: idx * 0.1 }}
                    >
                      <p className="text-foreground">{skill}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </ParallaxWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}