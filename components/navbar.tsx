'use client'

import { ArrowUpRight, Menu, X } from 'lucide-react'
import { useState } from 'react'

const items = [['01', 'Journey', 'journey'], ['02', 'Works', 'work'], ['03', 'Services', 'expertise'], ['04', 'Contact', 'contact']]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  return <header className="site-nav" aria-label="Primary navigation">
    <a className="island-brand" href="#top" aria-label="Christopher Rateng home"><span className="monogram">CR</span><span className="availability"><i /> Available for Systems &amp; Web Architecture</span></a>
    <nav className={open ? 'nav-links open' : 'nav-links'}>{items.map(([index, label, id]) => <a className="nav-link" href={`#${id}`} key={id} onClick={() => setOpen(false)}><span>[{index}]</span> {label}</a>)}</nav>
    <a className="nav-cta" href="#contact">Let&apos;s talk <ArrowUpRight data-icon="inline-end" aria-hidden="true" /></a>
    <button className="menu-button" onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}>{open ? <X /> : <Menu />}</button>
  </header>
}
