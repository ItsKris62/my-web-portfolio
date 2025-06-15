import React from 'react'
import styles from './AnimatedButton.module.css'

export interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({ children, className = '', ...props }) => (
  <button className={`${styles.button} ${className}`} {...props}>
    {children}
    <span className={styles.inject}></span>
  </button>
)

export default AnimatedButton