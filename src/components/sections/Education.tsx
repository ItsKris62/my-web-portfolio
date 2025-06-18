import Card from '../ui/Card';
import { FadeInSection } from '../animations/FadeInSection';

export default function Education() {
  return (
    <section id="education" className="py-20 bg-background-mid">
      <FadeInSection><h2 className="text-4xl font-serif text-center mb-12">Education</h2></FadeInSection>
      <div className="container mx-auto grid md:grid-cols-2 gap-8 px-4">
        <FadeInSection>
          <Card>
            <h3 className="text-2xl font-semibold">MSc Information Systems (In Progress)</h3>
            <p>USIU — Expected 2026</p>
            <div className="w-full bg-gray-700 rounded-full h-2 mt-4">
              <div className="bg-primary h-2 rounded-full" style={{ width: '50%' }}></div>
            </div>
          </Card>
        </FadeInSection>
        <FadeInSection>
          <Card>
            <h3 className="text-2xl font-semibold">BSc Information Systems</h3>
            <p>USIU — 2023 | GPA: 3.8/4.0</p>
          </Card>
        </FadeInSection>
      </div>
    </section>
  );
}