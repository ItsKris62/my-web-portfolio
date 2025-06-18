import Image from 'next/image';
import { FadeInSection } from '../animations/FadeInSection';
import { CounterAnimation } from '../animations/CounterAnimation';
import { ParallaxSection } from '../animations/ParallaxSection';
export default function About() {
  return (
    <ParallaxSection id="about" className="py-20 bg-background-mid">
      <div className="container mx-auto flex flex-col md:flex-row items-center gap-12 px-4">
        <FadeInSection>
          <div className="w-full md:w-1/3">
            <Image src="/assets/images/My-profile.jpg" alt="Christopher Rateng" width={300} height={300} className="rounded-full shadow-lg" />
          </div>
        </FadeInSection>
        <div className="w-full md:w-2/3 space-y-6">
          <FadeInSection><h2 className="text-4xl font-serif">About Me</h2></FadeInSection>
          <FadeInSection><p className="text-secondary">I&apos;m an IT Systems Engineer and Front-End Developer based in Nairobi with 3+ years of experience optimizing infrastructure and building modern web apps.</p></FadeInSection>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            <div className="text-center">
              <CounterAnimation from={0} to={3} />+<p className="mt-2 text-sm">Years Experience</p>
            </div>
            <div className="text-center">
              <CounterAnimation from={0} to={100} />+<p className="mt-2 text-sm">Users Managed</p>
            </div>
            <div className="text-center">
              <CounterAnimation from={0} to={25} />%<p className="mt-2 text-sm">Downtime Reduction</p>
            </div>
            <div className="text-center">
              <CounterAnimation from={0} to={95} />%<p className="mt-2 text-sm">Client Satisfaction</p>
            </div>
          </div>
        </div>
      </div>
    </ParallaxSection>
  );
}