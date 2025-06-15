'use client'
import { useEffect, useState } from 'react'
import styles from './ThemeToggle.module.scss'

export default function ThemeToggle() {
  const [dark, setDark] = useState(true)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  return (
    <button
      className={styles.toggle}
      onClick={() => setDark(prev => !prev)}
      aria-label="Toggle theme"
    >
      {dark ? '🌙' : '☀️'}
    </button>
  )
}