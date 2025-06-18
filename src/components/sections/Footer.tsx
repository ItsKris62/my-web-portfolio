// File: components/sections/Footer.tsx
import { Github, Linkedin, Mail } from 'lucide-react'
import { SOCIAL } from '@/lib/constants'

export default function Footer() {
  return (
    <footer className="bg-background-dark text-text-secondary py-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About */}
        <div className="space-y-2">
          <h3 className="text-lg font-serif text-text-primary">Christopher Rateng</h3>
          <p className="text-sm">
            IT Systems Engineer & Front-End Developer based in Nairobi. Building performant
            interfaces and rock-solid infrastructure.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-md font-serif text-text-primary mb-2">Quick Links</h4>
          <ul className="space-y-1 text-sm">
            <li>
              <a href="#hero" className="hover:text-primary transition">Home</a>
            </li>
            <li>
              <a href="#about" className="hover:text-primary transition">About</a>
            </li>
            <li>
              <a href="#experience" className="hover:text-primary transition">Experience</a>
            </li>
            <li>
              <a href="#projects" className="hover:text-primary transition">Projects</a>
            </li>
            <li>
              <a href="#contact" className="hover:text-primary transition">Contact</a>
            </li>
          </ul>
        </div>

        {/* Social & Contact */}
        <div className="space-y-2">
          <h4 className="text-md font-serif text-text-primary mb-2">Connect</h4>
          <div className="flex space-x-4">
            <a
              href={SOCIAL.github}
              target="_blank"
              rel="noopener"
              className="p-2 bg-background-mid rounded-full hover:bg-opacity-80 transition"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a
              href={SOCIAL.linkedin}
              target="_blank"
              rel="noopener"
              className="p-2 bg-background-mid rounded-full hover:bg-opacity-80 transition"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a
              href={`mailto:${SOCIAL.email}`}
              className="p-2 bg-background-mid rounded-full hover:bg-opacity-80 transition"
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-background-mid mt-8 pt-6 text-center text-xs text-cool-gray">
        © {new Date().getFullYear()} Christopher Rateng. All rights reserved.
      </div>
    </footer>
  )
}
