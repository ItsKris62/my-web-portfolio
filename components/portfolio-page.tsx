import Navbar from '@/components/navbar'
import { ContactFooter, Hero, Services, Stats, Timeline, WorkBento } from '@/components/landing-sections'

export default function PortfolioPage() {
  return <div className="site-shell"><Navbar /><main id="top"><Hero /><Stats /><Timeline /><Services /><WorkBento /><ContactFooter /></main></div>
}
