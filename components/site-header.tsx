'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { siteConfig } from '@/lib/data'

const navItems = [
  ['Work', 'work'],
  ['Capabilities', 'capabilities'],
  ['Journey', 'journey'],
  ['Services', 'services'],
  ['About', 'about'],
  ['Credentials', 'credentials'],
  ['Contact', 'contact'],
]

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<string>('')
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY
          setIsScrolled(currentY > 30)

          const sectionIds = navItems.map(([, id]) => id)
          const scrollPosition = currentY + 220

          for (let i = sectionIds.length - 1; i >= 0; i--) {
            const id = sectionIds[i]
            const el = document.getElementById(id)
            if (el && el.offsetTop <= scrollPosition) {
              setActiveSection(id)
              break
            }
          }
          if (currentY < 200) setActiveSection('')
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    setMenuOpen(false)
    const element = document.getElementById(id)
    if (element) {
      const yOffset = -80
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: 'smooth' })
      setActiveSection(id)
      history.replaceState(null, '', `#${id}`)
    }
  }

  return (
    <header className={`site-nav${isScrolled ? ' scrolled' : ''}`} aria-label="Primary navigation">
      <a
        className="brand"
        href="#top"
        onClick={(e) => {
          e.preventDefault()
          window.scrollTo({ top: 0, behavior: 'smooth' })
          setActiveSection('')
          history.replaceState(null, '', '#')
        }}
        aria-label={`${siteConfig.name} — return to top`}
      >
        <div className="brand-logo-frame">
          <Image
            src="/branding/christopher-rateng-logo-icon.png"
            alt="Christopher Rateng Monogram Logo"
            width={34}
            height={34}
            className="brand-logo-img"
            priority
          />
        </div>
        <div className="brand-text">
          <span className="brand-name">{siteConfig.name}</span>
          <span className="brand-tag">HYBRID ENGINEERING STUDIO</span>
        </div>
      </a>

      <nav className={`nav-links${menuOpen ? ' open' : ''}`} aria-label="Site sections" id="main-nav">
        {navItems.map(([label, id]) => {
          const isActive = activeSection === id
          return (
            <a
              key={id}
              href={`#${id}`}
              className={`nav-link${isActive ? ' active' : ''}`}
              onClick={(e) => scrollToSection(e, id)}
              aria-current={isActive ? 'location' : undefined}
            >
              {label}
              {isActive && <span className="nav-active-indicator" aria-hidden="true" />}
            </a>
          )
        })}
      </nav>

      <a
        id="nav-cta-talk"
        className="nav-cta"
        href="#contact"
        onClick={(e) => scrollToSection(e, 'contact')}
        aria-label="Contact Christopher Rateng"
      >
        Let&apos;s talk <ArrowUpRight aria-hidden="true" />
      </a>

      <button
        id="nav-mobile-toggle"
        className="menu-button"
        onClick={() => setMenuOpen((o) => !o)}
        aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={menuOpen}
        aria-controls="main-nav"
      >
        {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
      </button>
    </header>
  )
}
