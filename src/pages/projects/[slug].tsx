import { useRouter } from 'next/router'
import { projects } from '@/data/projects.json'
import LazyImage from '@/components/common/LazyImage'

export default function ProjectDetail() {
  const { slug } = useRouter().query
  const project = projects.find(p => p.slug === slug)
  if (!project) return <p>Project not found</p>

  return (
    <article className="py-16 px-8 bg-gray-900 text-white max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
      <p className="mb-6">{project.desc}</p>
      {project.screenshots?.map((src, idx) => (
        <LazyImage key={idx} src={src} alt={`${project.title} screenshot ${idx + 1}`} />
      ))}
    </article>
  )
}