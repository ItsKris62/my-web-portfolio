import Card from '../ui/Card';
import { FadeInSection } from '../animations/FadeInSection';
import { ParallaxSection } from '../animations/ParallaxSection';

const experiences = [
  {
    title: 'IT Support Lead',
    company: 'Net Scaling Solutions',
    duration: '2024 – Present',
    bullets: [
      'Led a team of 5 support technicians',
      'Implemented RMM and automated patch management',
      'Improved ticket resolution time by 30%'
    ]
  },
  {
    title: 'IT Support Engineer',
    company: 'Sledge Group',
    duration: '2022 – 2024',
    bullets: [
      'Managed Microsoft 365 and AD',
      'Configured VPNs and VLANs',
      'Reduced system downtime by 20%'
    ]
  }
];

export default function Experience() {
  return (
    <ParallaxSection id="experience" className="py-20">
      <FadeInSection><h2 className="text-4xl font-serif text-center mb-12">Experience</h2></FadeInSection>
      <div className="container mx-auto space-y-8 px-4">
        {experiences.map((exp) => (
          <FadeInSection key={exp.title}>
            <Card>
              <h3 className="text-2xl font-semibold">{exp.title}</h3>
              <p className="text-secondary italic">{exp.company} | {exp.duration}</p>
              <ul className="list-disc list-inside mt-4 space-y-2">
                {exp.bullets.map((b, i) => <li key={i}>{b}</li>)}
              </ul>
            </Card>
          </FadeInSection>
        ))}
      </div>
    </ParallaxSection>
  );
}