'use client'

import { Menu, X, ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

const items = [['About','about'],['Journey','journey'],['Expertise','expertise'],['Work','work'],['Contact','contact']]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  return <header className="site-nav" aria-label="Primary navigation">
    <a className="brand" href="#top" aria-label="Christopher Rateng home"><span className="brand-logo-frame"><Image src="/branding/christopher-rateng-logo-icon.png" alt="" width={35} height={35} className="brand-logo-img" /></span><span className="brand-text"><span className="brand-name">Christopher Rateng</span><span className="brand-tag">SYSTEMS · SECURITY</span></span></a>
    <nav className={open ? 'nav-links open' : 'nav-links'}>{items.map(([label,id]) => <a className="nav-link" href={`#${id}`} key={id} onClick={() => setOpen(false)}>{label}</a>)}</nav>
    <a className="nav-cta" href="#contact">Connect <ArrowUpRight aria-hidden="true" /></a>
    <button className="menu-button" onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}>{open ? <X /> : <Menu />}</button>
  </header>
}
