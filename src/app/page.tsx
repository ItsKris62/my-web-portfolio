'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import components with no SSR
const Hero = dynamic(() => import('../components/ui/Hero'), { ssr: false });
const Summary = dynamic(() => import('../components/ui/Summary'), { ssr: false });
const Skills = dynamic(() => import('../components/ui/Skills'), { ssr: false });
const Experience = dynamic(() => import('../components/ui/Experience'), { ssr: false });
const Projects = dynamic(() => import('../components/ui/Projects'), { ssr: false });
const GitHubChart = dynamic(() => import('../components/ui/GithubChart'), { ssr: false });
const Contact = dynamic(() => import('../components/ui/Contact'), { ssr: false });
const Footer = dynamic(() => import('../components/ui/Footer'), { ssr: false });

function App() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-[#FFEBD0]">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="h-12 bg-gray-200 rounded animate-pulse mx-auto w-48 mb-4" />
          <div className="h-4 bg-gray-200 rounded animate-pulse mx-auto w-64" />
        </div>
      </div>
    );
  }

  return (
    <div className="scroll-smooth">
      <Hero />
      <Summary />
      <Skills />
      <Experience />
      <Projects />
      <GitHubChart />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;