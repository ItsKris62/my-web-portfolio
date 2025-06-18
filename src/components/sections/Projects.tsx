import Card from '../ui/Card';
import { FadeInSection } from '../animations/FadeInSection';

const projects = [
  {
    title: 'Network Infrastructure Redesign',
    description: 'Designed VLANs and optimized routing for 150 users.',
    github: '#',
    demo: '#',
    tech: ['Cisco', 'Juniper']
  },
  {
    title: 'Microsoft 365 Migration',
    description: 'Migrated 200 mailboxes with zero downtime.',
    github: '#',
    demo: '#',
    tech: ['PowerShell', 'Azure AD']
  }
];

export default function Projects() {
  return (
    <section id="projects" className="py-20">
      <FadeInSection><h2 className="text-4xl font-serif text-center mb-12">Projects</h2></FadeInSection>
      <div className="container mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
        {projects.map(p => (
          <FadeInSection key={p.title}>
            <Card>
              <h3 className="text-2xl font-semibold">{p.title}</h3>
              <p className="mt-2 text-secondary">{p.description}</p>
              <p className="mt-2 text-sm font-mono">Tech: {p.tech.join(', ')}</p>
              <div className="mt-4 flex space-x-4">
                <a href={p.github} className="underline">GitHub</a>
                <a href={p.demo} className="underline">Live Demo</a>
              </div>
            </Card>
          </FadeInSection>
        ))}
      </div>
    </section>
  );
}