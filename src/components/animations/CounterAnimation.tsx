"use client";
import { FC, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

export const CounterAnimation: FC<{ from: number; to: number; duration?: number }> = ({ from, to, duration = 2000 }) => {
  const [count, setCount] = useState(from);
  const { ref, inView } = useInView({ triggerOnce: true });
  useEffect(() => {
    if (!inView) return;
    let current = from;
    const increment = Math.ceil((to - from) / (duration / 50));
  const timer = setInterval(() => {
    current += increment;
    if (current >= to) { setCount(to); clearInterval(timer); }
    else setCount(current);
  }, 50);
  }, [inView]);
  return <span ref={ref}>{count}</span>;
};