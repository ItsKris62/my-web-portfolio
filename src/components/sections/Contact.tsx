'use client';
import { useState } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

export default function Contact() {
  const [form, setForm] = useState({ name:'', email:'', subject:'', message:'', budget:'' });
  const [status, setStatus] = useState('');
  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!executeRecaptcha) return;
    const token = await executeRecaptcha('contact_form');
    const res = await fetch('/api/contact', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, token })
    });
    const data = await res.json();
    setStatus(data.success ? 'Message sent!' : 'Error sending message.');
  };

  return (
    <section id="contact" className="py-20">
      <h2 className="text-4xl font-serif text-center mb-10">Contact</h2>
      <div className="container mx-auto max-w-lg px-4">
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
          <Input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
          <Input name="subject" placeholder="Subject" value={form.subject} onChange={handleChange} required />
          <textarea name="message" rows={5} placeholder="Message" value={form.message} onChange={handleChange} className="w-full p-3 bg-background-dark rounded-md border border-secondary" required />
          <Input name="budget" placeholder="Project Budget (optional)" value={form.budget} onChange={handleChange} />
          <Button type="submit">Send Message</Button>
        </form>
        {status && <p className="mt-4 text-center">{status}</p>}
      </div>
    </section>
  );
}