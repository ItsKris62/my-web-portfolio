import Link from 'next/link'
import styles from './Header.module.scss'

const navItems = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export default function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        {navItems.map(item => (
          <Link key={item.href} href={item.href}>
            <a className={styles.link}>{item.label}</a>
          </Link>
        ))}
      </nav>
    </header>
  )
}