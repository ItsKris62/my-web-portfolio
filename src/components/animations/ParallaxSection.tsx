'use client'

import { ReactNode, useRef } from 'react'
import { motion, useScroll, useTransform, HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ParallaxSectionProps extends Omit<HTMLMotionProps<'section'>, 'style'> {
  children: ReactNode
  /** how much to shift (in px) between top and bottom of viewport */
  offset?: number
}

export function ParallaxSection({ children, offset = 50, className, style, ...props }: ParallaxSectionProps) {
  const ref = useRef<HTMLElement>(null)
  // track scroll progress of *this* section
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  // map [0 → 1] → [ +offset → –offset ]
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset])

  return (
    <motion.section
      ref={ref}
      style={{ y, ...style }}
      initial={{ opacity: 0, scale: 0.97 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      viewport={{ once: true, margin: '-20% 0px -20% 0px' }}
      className={cn("will-change-transform", className)} // Combine base class with passed className
      {...props} // Spread other props like id, aria-label, etc.
    >
      {children}
    </motion.section>
  )
}