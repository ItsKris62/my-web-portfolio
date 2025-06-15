import React, { InputHTMLAttributes } from 'react'
import styles from './Input.module.scss'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  id: string
}

const Input: React.FC<InputProps> = ({ label, id, className = '', ...props }) => (
  <div className={styles.container}>
    {label && <label htmlFor={id} className={styles.label}>{label}</label>}
    <input id={id} className={`${styles.input} ${className}`} {...props} />
  </div>
)

export default Input