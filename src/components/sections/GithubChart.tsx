'use client'

import { useState, useEffect } from 'react'
import GitHubCalendar from 'react-github-calendar'
import { motion } from 'framer-motion'

interface GithubChartProps {
  username?: string
}

interface CalendarData {
  username: string;
  loaded: boolean;
  const [calendarData, setCalendarData] = useState<CalendarData | null>(null)

export default function GithubChart({ username = 'ItsKris62' }: GithubChartProps) {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [calendarData, setCalendarData] = useState<any>(null)

  const container = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0, 0, 0.2, 1] } }
  }

  // This function is now properly used in the useEffect
  const handleError = (errorMessage: string) => {
    console.error('GitHub Calendar Error:', errorMessage)
  const handleLoad = (data: CalendarData) => {
    setLoading(false)
    setError(null)
    setCalendarData(data)
  }
  const handleLoad = (data: any) => {
    setLoading(false)
    setError(null)
    setCalendarData(data)
  }

  // Enhanced validation and data fetching
  useEffect(() => {
    if (!username || typeof username !== 'string' || username.trim() === '') {
      handleError('Invalid GitHub username provided')
      return
    }

    // Simulate API call or handle GitHub calendar loading
    const loadGitHubData = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // In a real scenario, you might fetch GitHub data here
        // For now, we'll assume success and let GitHubCalendar handle the actual API call
        handleLoad({ username, loaded: true })
        
      } catch (err) {
        handleError(err instanceof Error ? err.message : 'Unknown error occurred')
      }
  // Custom theme colors that are actually used
  const customTheme = { dark: ['#1E293B', '#64748B', '#00BFA6', '#FF6A3D', '#9B5DE5'] }
    level1: '#64748B',    // level 1  
    level2: '#00BFA6',    // level 2 (accent)
    level3: '#FF6A3D',    // level 3 (primary)
    level4: '#9B5DE5'     // level 4 (secondary)
  }

  return (
    <section id="github" className="py-20 bg-background-dark">
      <motion.div
        className="container mx-auto px-4 text-center space-y-8"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.h2 
          variants={item}
          className="text-4xl font-serif text-text-primary"
        >
          GitHub Contributions
        </motion.h2>

        <motion.div variants={item} className="mx-auto max-w-4xl">
          {error ? (
            <div className="p-8 text-red-400 bg-red-900/20 rounded-lg border border-red-800">
              <p className="text-lg font-medium">Unable to load GitHub data</p>
              <p className="text-sm mt-2 opacity-75">{error}</p>
            </div>
          ) : (
            <div className="relative">
              {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-background-dark/80 rounded-lg z-10">
                  <div className="flex items-center space-x-2 text-text-primary">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                    <span>Loading contributions for @{username}...</span>
                  </div>
                </div>
              )}
              
              <div className={loading ? 'opacity-50' : 'opacity-100'}>
                <GitHubCalendar
                <GitHubCalendar
                  username={username}
                  blockSize={15}
                  blockMargin={5}
                  fontSize={16}
                  hideColorLegend={false}
                  hideMonthLabels={false}
                  hideTotalCount={false}
                  style={{
                    color: 'var(--text-primary, #ffffff)',
                  }}
                  theme={customTheme}
                />
            </div>
          )}
        </motion.div>

        {!error && !loading && calendarData && (
          <motion.p 
            variants={item}
            className="text-sm text-text-secondary opacity-75"
          >
            Showing contributions for @{username} • Data loaded successfully
          </motion.p>
        )}
      </motion.div>
    </section>
  )
}