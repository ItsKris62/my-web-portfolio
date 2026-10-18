import { SiteHeader } from '@/components/site-header'
import { HeroSection } from '@/components/hero-section'
import { FeaturedWorkBento } from '@/components/featured-work-bento'
import { CapabilityExplorer } from '@/components/capability-explorer'
import { InteractiveCareer } from '@/components/interactive-career'
import { ServicesSection } from '@/components/services-section'
import { AboutSection } from '@/components/about-section'
import { EducationCredentials } from '@/components/education-credentials'
import { ConversionFooter } from '@/components/conversion-footer'

export default function PortfolioPage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <HeroSection />
        <FeaturedWorkBento />
        <CapabilityExplorer />
        <InteractiveCareer />
        <ServicesSection />
        <AboutSection />
        <EducationCredentials />
      </main>
      <ConversionFooter />
    </>
  )
}
