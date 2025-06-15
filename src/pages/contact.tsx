import ContactForm from '@/components/sections/Contact/ContactForm'

export default function Contact() {
  return (
    <section id="contact" className="py-16 px-8 bg-gray-800">
      <h2 className="text-3xl font-bold text-white mb-6">Get in Touch</h2>
      <ContactForm />
    </section>
  )
}