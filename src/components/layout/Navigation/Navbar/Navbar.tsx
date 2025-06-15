import Link from 'next/link'
import styles from './Navbar.module.scss'

const NAV_LINKS = [
  { href: '#about', label: 'About' },
  { href: '#certifications', label: 'Certifications' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>ChrisRateng</Link>
        <ul className={styles.menu}>
          {NAV_LINKS.map(link => (
            <li key={link.href}>
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}