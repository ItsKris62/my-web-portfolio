'use client';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { ReactNode, useRef } from 'react';

interface ParallaxWrapperProps {
  children: ReactNode;
  offset?: number;
  startOffset?: number;
  endOffset?: number;
}

export default function ParallaxWrapper({
  children,
  offset = 50,
  startOffset = -100,
  endOffset = 100,
}: ParallaxWrapperProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '0px 0px -200px 0px' });
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, (value) => {
    if (!ref.current) return 0;
    const rect = (ref.current as HTMLElement).getBoundingClientRect();
    const scrollPosition = value + window.innerHeight - rect.top;
    const start = window.innerHeight + startOffset;
    const end = endOffset;
    if (scrollPosition < start) return 0;
    if (scrollPosition > rect.height + end) return offset;
    return (scrollPosition - start) * (offset / (rect.height + end - start));
  });

  const springY = useSpring(y, { stiffness: 100, damping: 30 });

  return (
    <motion.div ref={ref} style={{ y: isInView ? springY : 0 }} className="relative">
      {children}
    </motion.div>
  );
}