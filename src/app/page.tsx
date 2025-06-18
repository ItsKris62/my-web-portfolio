import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Experience from '../components/sections/Experience';
import Skills from '../components/sections/Skills';
import Projects from '../components/sections/Projects';
import Education from '../components/sections/Education';
import Contact from '../components/sections/Contact';
import Certifications from '../components/sections/Certifications'

import Footer from '../components/sections/Footer';

export default function Home() {
  return (
    <>
  <main className="space-y-32">
    <Hero />
    <About />
    <Experience />
    <Skills />
    <Projects />
    <Education />
    <Certifications />
    
    <Contact />
  </main>
    <Footer />
    </>
);
}