import Hero from '../components/ui/Hero';
import Summary from '../components/ui/Summary';
import Skills from '../components/ui/Skills';
import Experience from '../components/ui/Experience';
import Projects from '../components/ui/Projects';
import GitHubChart from '../components/ui/GithubChart';
import Contact from '../components/ui/Contact';
import Footer from '../components/ui/Footer';

function App() {
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