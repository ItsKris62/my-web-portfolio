'use client';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGithub,
  faWhatsapp,
  faCodepen,
  faOrcid,
  faStackOverflow,
  faLinkedin,
  faPeerlist,
  faEnvelope,
  faPhone,
} from '@fortawesome/free-brands-svg-icons';
import ParallaxWrapper from '../animations/ParallaxWrapper';

export default function Footer() {
  const socialLinks = [
    { icon: faGithub, href: 'https://github.com/ItsKris62', label: 'GitHub' },
    { icon: faEnvelope, href: 'mailto:crateng13@gmail.com', label: 'Email' },
    { icon: faPhone, href: 'tel:+254725841465', label: 'Phone' },
    { icon: faWhatsapp, href: 'https://wa.me/+254725841465', label: 'WhatsApp' },
    { icon: faCodepen, href: 'https://codepen.io/ItsKris62', label: 'CodePen' },
    { icon: faOrcid, href: 'https://orcid.org/0000-0002-1825-0097', label: 'ORCID' },
    { icon: faStackOverflow, href: 'https://stackoverflow.com/users/ItsKris62', label: 'StackOverflow' },
    { icon: faLinkedin, href: 'https://linkedin.com/in/crateng13', label: 'LinkedIn' },
    { icon: faPeerlist, href: 'https://peerlist.io/ItsKris62', label: 'Peerlist' },
  ];

  const quickLinks = [
    { name: 'About', href: '#summary' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <ParallaxWrapper offset={20}>
      <motion.footer
        className="py-12 bg-primary text-primary-foreground relative overflow-hidden"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* Background Pattern */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: "url('/assets/pattern-2.png')" }}
        />

        <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          {/* Personal Info */}
          <div>
            <h3 className="text-xl font-display mb-4">Christopher Rateng</h3>
            <p>Email: <a href="mailto:crateng13@gmail.com" className="hover:underline">crateng13@gmail.com</a></p>
            <p>Phone: <a href="tel:+254725841465" className="hover:underline">+254725841465</a></p>
          </div>

          {/* Social Media Links */}
          <div>
            <h3 className="text-xl font-display mb-4">Connect With Me</h3>
            <div className="flex flex-wrap gap-4">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-foreground"
                  whileHover={{ scale: 1.2, color: '#4AB8B3', transition: { duration: 0.3 } }}
                  title={link.label}
                >
                  <FontAwesomeIcon icon={link.icon} size="2x" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-display mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <motion.a
                    href={link.href}
                    className="relative text-primary-foreground hover:text-accent"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    {link.name}
                    <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-accent transition-all duration-300 hover:w-full" />
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.footer>
    </ParallaxWrapper>
  );
}