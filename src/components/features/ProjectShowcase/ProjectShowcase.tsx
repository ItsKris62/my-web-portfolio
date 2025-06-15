import Card from '@/components/ui/Card'
import styles from './ProjectShowcase.module.scss'

interface Project { title: string; desc: string; link?: string }
interface ShowcaseProps { projects: Project[] }

export default function ProjectShowcase({ projects }: ShowcaseProps) {
  return (
    <section id="projects" className={styles.section}>
      <h2 className="text-3xl mb-6">Projects</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {projects.map(p => (
          <Card key={p.title} className="hover:shadow-indigo-500/50">
            <h3 className="text-xl font-bold mb-2">{p.title}</h3>
            <p className="mb-4">{p.desc}</p>
            {p.link && (
              <a href={p.link} target="_blank" rel="noopener" className="text-indigo-400 hover:underline">
                View Project
              </a>
            )}
          </Card>
        ))}
      </div>
    </section>
  )
}