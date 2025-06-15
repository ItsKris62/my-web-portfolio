'use client'
import { useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import AnimatedButton from '@/components/ui/AnimatedButton'
import styles from './ContactForm.module.scss'

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [token, setToken] = useState<string | null>(null)
  const [status, setStatus] = useState<'idle'|'sending'|'sent'|'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!token) return alert('Please complete the CAPTCHA')
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, token }),
      })
      if (res.ok) setStatus('sent')
      else throw new Error()
    } catch {
      setStatus('error')
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        className={styles.input}
        required
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        className={styles.input}
        required
      />
      <textarea
        name="message"
        placeholder="Your message..."
        value={form.message}
        onChange={handleChange}
        className={styles.textarea}
        required
      />
      <ReCAPTCHA
        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
        onChange={setToken}
      />
      <AnimatedButton type="submit" disabled={status==='sending'}>
        {status === 'sending' ? 'Sending…' : 'Send Message'}
      </AnimatedButton>
      {status==='sent' && <p className="mt-2 text-green-400">Message sent!</p>}
      {status==='error' && <p className="mt-2 text-red-400">Something went wrong.</p>}
    </form>
  )
}