'use client';
import { motion } from 'framer-motion';

const projects = [
  {
    title: 'Cybersecurity Dashboard',
    description: 'A dashboard for monitoring network security, built with React and Node.js.',
    type: 'Frontend & Backend',
  },
  {
    title: 'Portfolio Website',
    description: 'This website showcasing my skills, built with Next.js and Tailwind CSS.',
    type: 'Frontend',
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-16 bg-secondary">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-4xl font-display text-center mb-8">My Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="p-6 rounded-lg bg-white/5 border border-white/10"
              whileHover={{ scale: 1.05, boxShadow: '0 10px 20px rgba(0,0,0,0.2)' }}
              transition={{ duration: 0.3 }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-display">{project.title}</h3>
              <p className="text-sm text-muted-foreground">{project.type}</p>
              <p className="mt-2 text-foreground">{project.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}