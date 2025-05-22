'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import ReCAPTCHA from 'react-google-recaptcha';
import { Player as Lottie } from '@lottiefiles/react-lottie-player';

interface FormData {
  name: string;
  email: string;
  message: string;
}

export default function ContactForm() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const onSubmit = async (data: FormData) => {
    if (!recaptchaToken) {
      alert('Please complete the reCAPTCHA.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, recaptchaToken }),
      });

      if (response.ok) {
        setShowSuccess(true);
        reset();
        setTimeout(() => setShowSuccess(false), 3000); // Hide animation after 3 seconds
      } else {
        const error = await response.json();
        alert(error.message || 'Failed to send message.');
      }
    } catch (error) {
      alert('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
      setRecaptchaToken(null);
    }
  };

  return (
    <div className="relative">
      {showSuccess && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center z-20"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
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
        onSubmit={handleSubmit(onSubmit)}
        className={`space-y-4 backdrop-blur-md bg-white/10 p-6 rounded-xl border border-white/20 ${showSuccess ? 'opacity-50' : ''}`}
      >
        <div>
          <input
            {...register('name', { required: 'Name is required', maxLength: { value: 50, message: 'Name must be less than 50 characters' } })}
            placeholder="Name"
            className="w-full p-3 bg-transparent border border-white/20 rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <input
            {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' } })}
            placeholder="Email"
            className="w-full p-3 bg-transparent border border-white/20 rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <textarea
            {...register('message', { required: 'Message is required', maxLength: { value: 500, message: 'Message must be less than 500 characters' } })}
            placeholder="Message"
            className="w-full p-3 bg-transparent border border-white/20 rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            rows={4}
          />
          {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
        </div>
        <div className="flex justify-center">
          <ReCAPTCHA
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
            onChange={(token: string | null) => setRecaptchaToken(token)}
          />
        </div>
        <motion.button
          type="submit"
          className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg disabled:opacity-50"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </motion.button>
      </form>
    </div>
  );
}