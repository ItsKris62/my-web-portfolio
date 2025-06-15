import gsap from 'gsap'
export const fadeIn = (ref: any) => gsap.from(ref, { opacity: 0, y: 20, duration: 1 })