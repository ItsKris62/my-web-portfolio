'use client';
import { motion } from 'framer-motion';
import ParallaxWrapper from '../animations/ParallaxWrapper';

const experiences = [
  {
    role: 'IT Support Lead',
    company: 'Net Scaling Solutions, LLC',
    period: '08/2023 – present',
    location: 'Maryland, USA',
    achievements: [
      'Led a team of 3 IT support technicians, reducing ticket resolution time by 20% through process optimization and training.',
      'Implemented a Remote Monitoring & Management (RMM) system, resulting in a 25% decrease in system downtime and a 15% improvement in system stability.',
      'Managed Microsoft 365 for 100+ users, ensuring 99.9% uptime and compliance with security policies.',
      'Configured VLANs and wireless networks for 5+ buildings remotely, improving network performance and user satisfaction.',
    ],
  },
  {
    role: 'IT Support Engineer',
    company: 'Sledge Group Enterprises',
    period: '10/2020 – 08/2023',
    location: 'Nairobi, Kenya',
    achievements: [
      'Provided technical support for 100+ users, achieving a 95% satisfaction rate and resolving issues within an average of 30 minutes.',
      'Configured Layer 3 switches, reducing network downtime by 15% and improving data transfer speeds by 20%.',
      'Implemented IP PBX systems for 50+ extensions, ensuring 99.9% call quality through QoS configurations.',
    ],
  },
];

export default function Experience() {
  return (
    <section
      id="experience"
      className="py-16 bg-background relative overflow-hidden"
    >
      {/* Background Pattern with Parallax */}
      <ParallaxWrapper offset={100}>
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url('/assets/pattern-2.png')" }}
        />
      </ParallaxWrapper>

      <div className="max-w-5xl mx-auto px-4 relative z-10">
        <ParallaxWrapper offset={50}>
          <h2 className="text-4xl font-display text-center mb-8">My Professional Journey</h2>
        </ParallaxWrapper>
        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <ParallaxWrapper key={index} offset={30 + index * 10}>
              <motion.div
                className="p-6 rounded-lg bg-white/5 border border-white/10"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-xl font-display">{exp.role}</h3>
                <p className="text-sm text-muted-foreground">{exp.company} | {exp.period} | {exp.location}</p>
                <ul className="mt-4 list-disc list-inside text-foreground">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i}>{achievement}</li>
                  ))}
                </ul>
              </motion.div>
            </ParallaxWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}