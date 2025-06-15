// src/app/page.tsx
'use client'

import MouseTrail from '@/components/effects/MouseTrail/MouseTrail'
import Hero from '@/components/sections/Hero/Hero'
import CertificationDisplay from '@/components/features/CertificationDisplay/CertificationDisplay'
import ProjectShowcase from '@/components/features/ProjectShowcase/ProjectShowcase'
import ContactForm from '@/components/sections/Contact/ContactForm'

export default function Home() {
  const certifications = [
    'NDG Linux Unhatched',
    'Professional Member – ACPK',
    'IBM Cloud Essentials V3',
    'IBM – SQL and Relational Databases 101',
    'EF SET English Certificate 79/100 (C2 Proficient)',
  ]

  const projects = [
    {
      title: 'Remote Monitoring & Management',
      desc: 'Streamlined PC maintenance with an RMM solution.',
      link: 'https://github.com/your-repo/rmm',
    },
    {
      title: 'VoIP Migration',
      desc: 'Boosted communications efficiency by 30% via cloud telephony.',
      link: 'https://github.com/your-repo/voip-migration',
    },
    {
      title: 'Network Architecture',
      desc: 'Designed and scaled infrastructure for enterprise growth.',
      link: 'https://github.com/your-repo/network-design',
    },
  ]

  return (
    <>
      <MouseTrail />

      <section id="hero">
        <Hero />
      </section>

      <section id="certifications">
        <CertificationDisplay certifications={certifications} />
      </section>

      <section id="projects">
        <ProjectShowcase projects={projects} />
      </section>

      <section id="contact" className="bg-bg-alt dark:bg-bg-alt py-16">
        <h2 className="text-3xl font-bold text-center mb-8">Get in Touch</h2>
        <ContactForm />
      </section>
    </>
  )
}
