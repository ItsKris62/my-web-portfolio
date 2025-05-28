"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import dynamic from 'next/dynamic';
import { Player as Lottie } from '@lottiefiles/react-lottie-player';

// Dynamically import ReCAPTCHA with no SSR
const ReCAPTCHA = dynamic(() => import('react-google-recaptcha'), {
  ssr: false
});

interface FormData {
  name: string;
  email: string;
  message: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="space-y-6 p-8 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg">
        <div className="h-12 bg-gray-200 rounded animate-pulse" />
        <div className="h-12 bg-gray-200 rounded animate-pulse" />
        <div className="h-32 bg-gray-200 rounded animate-pulse" />
        <div className="h-12 bg-gray-200 rounded animate-pulse" />
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!formData.name.trim()) newErrors.name = "Name is required.";
    else if (formData.name.length > 50) newErrors.name = "Name must be less than 50 characters.";

    if (!formData.email.trim()) newErrors.email = "Email is required.";
    else if (!/^\S+@\S+$/.test(formData.email)) newErrors.email = "Invalid email format.";

    if (!formData.message.trim()) newErrors.message = "Message is required.";
    else if (formData.message.length > 500) newErrors.message = "Message must be less than 500 characters.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    if (!recaptchaToken) {
      alert("Please complete the reCAPTCHA.");
      return;
    }

    setIsSubmitting(true);
    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setShowSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      setRecaptchaToken(null);

      setTimeout(() => setShowSuccess(false), 3000);
    } catch {
      alert("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative">
      {showSuccess && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="absolute inset-0 flex items-center justify-center z-20 backdrop-blur-sm"
        >
          <Lottie
            autoplay
            loop={false}
            src="/success-animation.json"
            style={{ width: 200, height: 200 }}
          />
        </motion.div>
      )}

      <form
        onSubmit={onSubmit}
        className={`space-y-6 p-8 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg transition-all ${
          showSuccess ? "opacity-50 pointer-events-none" : ""
        }`}
      >
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">Your Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            className="w-full px-4 py-3 rounded-lg bg-transparent border border-white/30 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">Your Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className="w-full px-4 py-3 rounded-lg bg-transparent border border-white/30 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-1">Your Message</label>
          <textarea
            id="message"
            name="message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell me about your project..."
            className="w-full px-4 py-3 rounded-lg bg-transparent border border-white/30 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
          />
          {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
        </div>

        <div className="flex justify-center my-2">
          <ReCAPTCHA
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "dummy-site-key"}
            onChange={(token: string | null) => setRecaptchaToken(token)}
          />
        </div>

        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-3 px-6 rounded-lg bg-primary text-primary-foreground font-medium transition-colors hover:bg-opacity-90 disabled:opacity-60"
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </motion.button>
      </form>
    </div>
  );
}