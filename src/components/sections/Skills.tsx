import Card from '../ui/Card';
import { FadeInSection } from '../animations/FadeInSection';


const skills = [
  'Network Configuration (VLAN, VPN)',
  'Microsoft 365 & Active Directory',
  'System Administration',
  'Automation & RMM',
  'Security & Compliance'
];
const certs = [
  { name: 'IBM Certified Administrator', link: '#' },
  { name: 'Cisco Ethical Hacker (In Progress)', link: '#' },
  { name: 'Professional Member ACPK', link: '#' }
];

export default function Skills() {
  return (
    <section id="skills" className="py-20 bg-background-mid">
      <FadeInSection><h2 className="text-4xl font-serif text-center mb-12">Skills & Certifications</h2></FadeInSection>
      <div className="container mx-auto grid md:grid-cols-2 gap-8 px-4">
        <FadeInSection>
          <Card>
            <h3 className="text-2xl mb-4">Technical Skills</h3>
            <ul className="list-disc list-inside space-y-2">
              {skills.map(s => <li key={s}>{s}</li>)}
            </ul>
          </Card>
        </FadeInSection>
        <FadeInSection>
          <Card>
            <h3 className="text-2xl mb-4">Certifications</h3>
            <ul className="space-y-4">
              {certs.map(c => <li key={c.name}><a href={c.link} className="underline hover:text-primary">{c.name}</a></li>)}
            </ul>
          </Card>
        </FadeInSection>
      </div>
    </section>
  );
}