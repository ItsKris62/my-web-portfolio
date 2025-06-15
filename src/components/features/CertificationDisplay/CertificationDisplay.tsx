import Card from '@/components/ui/Card'
import styles from './CertificationDisplay.module.scss'

interface CertProps {
  certifications: string[]
}

export default function CertificationDisplay({ certifications }: CertProps) {
  return (
    <section id="certifications" className={styles.section}>
      <h2 className="text-3xl mb-6">Certifications</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {certifications.map(cert => (
          <Card key={cert}>
            <p className="font-semibold">{cert}</p>
          </Card>
        ))}
      </div>
    </section>
  )
}