import { ReactNode } from 'react'
import Header from '@/components/layout/Header/Header'
import ThemeToggle from '@/components/layout/ThemeToggle/ThemeToggle'

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900 transition-colors">
      <Header />
      <ThemeToggle />
      <main>{children}</main>
    </div>
  )
}