import ProjectShowcase from '@/components/features/ProjectShowcase/ProjectShowcase'
import { projects } from '@/data/projects.json'

export default function ProjectsPage() {
  return (
    <section id="projects" className="py-16 px-8 bg-gray-900 text-white">
      <h2 className="text-3xl font-bold mb-6">All Projects</h2>
      <ProjectShowcase projects={projects} />
    </section>
  )
}