'use client'

import { motion } from 'motion/react'

export function LanyardSpine() {
  return (
    <div className="lanyard-spine" aria-hidden="true">
      <svg viewBox="0 0 420 1800" preserveAspectRatio="none" role="presentation">
        <defs>
          <path id="lanyard-route" d="M 150 0 C 150 110 350 60 360 180 C 372 330 265 390 330 520 C 390 650 270 780 338 930 C 390 1080 275 1210 330 1370 C 360 1460 310 1600 285 1800" />
        </defs>
        <use href="#lanyard-route" className="lanyard-outline" />
        <use href="#lanyard-route" className="lanyard-ribbon" />
        <use href="#lanyard-route" className="lanyard-stitch" />
        <text className="lanyard-text"><textPath href="#lanyard-route" startOffset="0%">CHRISTOPHER RATENG • SYSTEMS INFRASTRUCTURE • CLOUD SECURITY • AI AUTOMATION • </textPath></text>
        <g className="lanyard-clasp" transform="translate(138 8)"><path d="M10 0h24a10 10 0 0 1 10 10v19a10 10 0 0 1-10 10H10A10 10 0 0 1 0 29V10A10 10 0 0 1 10 0Z" /><path d="M9 10h26v11H9z" /><circle cx="22" cy="30" r="5" /></g>
      </svg>
    </div>
  )
}
