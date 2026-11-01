import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

const tracks = [
  {
    number: '01',
    label: 'FRONTEND ENGINEERING',
    title: 'Interfaces built for real users.',
    description: 'Component-driven applications, accessible UI, responsive design and purposeful interaction.',
    skills: ['React 19', 'Next.js App Router', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'Responsive UI'],
    reference: { label: 'Explore Kolwa Beba', href: '/work/kolwa-beba-sacco' },
  },
  {
    number: '02',
    label: 'BACKEND & INTEGRATIONS',
    title: 'APIs, data and application logic.',
    description: 'Typed APIs, data models, authentication, third-party integrations and operational reliability.',
    skills: ['Node.js', 'Fastify', 'tRPC', 'REST APIs', 'PostgreSQL', 'Prisma ORM'],
    reference: { label: 'Explore SheriaBot', href: '/work/sheriabot' },
  },
  {
    number: '03',
    label: 'DELIVERY & OPERATIONS',
    title: 'From development to deployment.',
    description: 'Deployment pipelines, monitoring, cloud hosting and secure automation from a systems-first perspective.',
    skills: ['Docker', 'GitHub Actions', 'Vercel', 'Render', 'Supabase', 'n8n'],
    reference: { label: 'Explore automation', href: '/work/automation-workflow-engineering' },
  },
] as const

export function EngineeringStack() {
  return (
    <section id="engineering-stack" className="section-pad ruled-section" aria-labelledby="stack-title">
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="eyebrow">
            <span className="eyebrow-dot" aria-hidden="true" />
            Applied Engineering Stack
          </p>
          <h2 id="stack-title" className="text-3xl font-semibold leading-tight tracking-tight md:text-5xl" style={{ color: 'var(--graphite)' }}>
            React to API. <em>Design to deployment.</em>
          </h2>
        </div>
        <p className="max-w-xl text-sm leading-relaxed md:text-base" style={{ color: 'var(--muted)' }}>
          Full-stack application engineering informed by infrastructure, security and operations.
          These tools are connected to work in the case studies, not an arbitrary logo collection.
        </p>
      </div>
      <div className="grid gap-3 md:grid-cols-3">
        {tracks.map((track) => (
          <article
            key={track.number}
            className="flex h-full flex-col rounded-xl border border-black/10 bg-white/70 p-5 transition-colors hover:border-black/25 md:p-6"
          >
            <div className="mb-6 flex items-center justify-between border-b border-black/10 pb-4">
              <span className="text-[0.68rem] font-semibold uppercase tracking-[0.16em]" style={{ color: 'var(--teal)' }}>
                {track.label}
              </span>
              <span className="text-xs font-mono" style={{ color: 'var(--muted)' }}>{track.number}</span>
            </div>
            <h3 className="mb-2 text-xl font-semibold leading-tight" style={{ color: 'var(--graphite)' }}>{track.title}</h3>
            <p className="mb-6 text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{track.description}</p>
            <div className="mb-7 flex flex-wrap gap-2">
              {track.skills.map((skill) => (
                <span key={skill} className="rounded-md border border-black/10 bg-black/[0.025] px-2.5 py-1.5 text-xs font-medium" style={{ color: 'var(--graphite)' }}>
                  {skill}
                </span>
              ))}
            </div>
            <Link href={track.reference.href} className="text-link mt-auto inline-flex items-center gap-2 text-sm">
              {track.reference.label}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </article>
        ))}
      </div>
      <p className="mt-5 text-xs leading-relaxed" style={{ color: 'var(--muted)' }}>
        Additional framework familiarity: NestJS. Practical project examples above primarily demonstrate Fastify, tRPC and Node.js backends.
      </p>
    </section>
  )
}
