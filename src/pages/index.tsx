import MouseTrail from '@/components/effects/MouseTrail/MouseTrail'
import Hero from '@/components/sections/Hero/Hero'
import CertificationDisplay from '@/components/features/CertificationDisplay/CertificationDisplay'
import ProjectShowcase from '@/components/features/ProjectShowcase/ProjectShowcase'

export default function Home() {
  const certifications = [
    'NDG Linux Unhatched',
    'Professional Member – ACPK',
    'IBM Cloud Essentials V3',
    'IBM - SQL and Relational Databases 101',
    'EF SET English Certificate 79/100 (C2 Proficient)',
  ]

  const projects = [
    { title: 'Remote Monitoring & Management', desc: 'Streamlined PC maintenance with RMM solution' },
    { title: 'VoIP Migration', desc: 'Boosted comms efficiency by 30%' },
    { title: 'Network Architecture', desc: 'Scaled infra for future growth' },
  ]

  return (
    <>
      <MouseTrail />
      <Hero />
      <CertificationDisplay certifications={certifications} />
      <ProjectShowcase projects={projects} />
    </>
  )
}