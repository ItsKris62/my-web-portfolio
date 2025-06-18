'use client'

import Script from 'next/script'
import { FC } from 'react'

const badges = [
  '4c739710-7231-46f5-9f7a-72ec1e0573fe',
  '7a92659e-6258-4d02-b4f7-d377c3d605fd',
  'dbfb4591-b856-4044-a2bf-40b8c71e5350',
]

const CredlyBadge: FC<{ id: string }> = ({ id }) => (
  <div
    className="inline-block"
    data-iframe-width="150"
    data-iframe-height="270"
    data-share-badge-id={id}
    data-share-badge-host="https://www.credly.com"
  />
)

export default function Certifications() {
  return (
    <section id="certifications" className="py-20 bg-background-mid">
      <h2 className="text-4xl font-serif text-text-primary text-center mb-8">
        Certifications & Badges
      </h2>

      <div className="flex flex-wrap justify-center gap-6">
        {badges.map((b) => (
          <CredlyBadge key={b} id={b} />
        ))}
      </div>

      {/* only need to load this once per page */}
      <Script
        src="https://cdn.credly.com/assets/utilities/embed.js"
        strategy="afterInteractive"
      />
    </section>
  )
}