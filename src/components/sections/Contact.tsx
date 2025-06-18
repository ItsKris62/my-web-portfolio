'use client';

import { useState, useEffect, useRef } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  User, 
  MessageSquare, 
  DollarSign,
  CheckCircle,
  AlertCircle,
  Loader2,
  Github,
  Linkedin,
  Twitter,
  Globe
} from 'lucide-react';

// Mock components for the demo - replace with your actual components
const Input = ({ name, type = 'text', placeholder, value, onChange, required, icon: Icon }) => (
  <div className="relative group">
    {Icon && (
      <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-400 transition-colors duration-300" size={18} />
    )}
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      className={`w-full ${Icon ? 'pl-10' : 'pl-4'} pr-4 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:bg-white/10 group-focus-within:bg-white/10`}
    />
  </div>
);

const Button = ({ type, children, disabled, onClick }) => (
  <button
    type={type}
    disabled={disabled}
    onClick={onClick}
    className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
  >
    {children}
  </button>
);

export default function Contact() {
  const [form, setForm] = useState({ 
    name: '', 
    email: '', 
    subject: '', 
    message: '', 
    budget: '' 
  });
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null);
  const formRef = useRef(null);

  // Mock executeRecaptcha for demo
  const executeRecaptcha = async () => 'mock-token';

  // Intersection Observer for entrance animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Mouse tracking for parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        setMousePosition({ x, y });
      }
    };

    const section = sectionRef.current;
    if (section) {
      section.addEventListener('mousemove', handleMouseMove);
      return () => section.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Clear status when user starts typing
    if (status) setStatus('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      if (!executeRecaptcha) {
        throw new Error('ReCaptcha not available');
      }
      
      const token = await executeRecaptcha('contact_form');
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, token })
      });
      
      const data = await res.json();
      
      if (data.success) {
        setStatus('success');
        setForm({ name: '', email: '', subject: '', message: '', budget: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'hello@yourname.com',
      href: 'mailto:hello@yourname.com'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+1 (555) 123-4567',
      href: 'tel:+15551234567'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'San Francisco, CA',
      href: 'https://maps.google.com'
    }
  ];

  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Globe, href: '#', label: 'Website' }
  ];

  return (
    <section 
      ref={sectionRef}
      id="contact" 
      className="relative min-h-screen py-20 overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900/30 to-purple-900/30"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Parallax floating elements */}
        <div 
          className="absolute w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"
          style={{
            top: '10%',
            left: `${20 + mousePosition.x * 10}%`,
            transform: `translateX(${mousePosition.x * 20}px) translateY(${mousePosition.y * 15}px)`
          }}
        />
        <div 
          className="absolute w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"
          style={{
            bottom: '20%',
            right: `${15 + mousePosition.y * 8}%`,
            transform: `translateX(${-mousePosition.x * 15}px) translateY(${-mousePosition.y * 20}px)`
          }}
        />
        <div 
          className="absolute w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-500"
          style={{
            top: '60%',
            left: `${60 + mousePosition.x * 5}%`,
            transform: `translateX(${mousePosition.x * 10}px) translateY(${mousePosition.y * 10}px)`
          }}
        />
        
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-16 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl shadow-lg">
              <MessageSquare className="text-white" size={24} />
            </div>
            <h2 className="text-5xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
              Let's Create Something Amazing
            </h2>
          </div>
          <p className="text-gray-300 text-xl max-w-3xl mx-auto leading-relaxed">
            Ready to bring your vision to life? I'm here to help you build exceptional digital experiences. 
            Let's discuss your project and make it happen.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          
          {/* Contact Information */}
          <div className={`space-y-8 transform transition-all duration-1000 delay-200 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'}`}>
            
            {/* Contact Methods */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-white mb-6">Get In Touch</h3>
              {contactInfo.map((info, index) => (
                <a
                  key={info.label}
                  href={info.href}
                  className="flex items-center gap-4 p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 transition-all duration-300 group cursor-pointer"
                  style={{ animationDelay: `${300 + index * 100}ms` }}
                >
                  <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg group-hover:scale-110 transition-transform duration-300">
                    <info.icon className="text-white" size={20} />
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm">{info.label}</div>
                    <div className="text-white font-medium">{info.value}</div>
                  </div>
                </a>
              ))}
            </div>

            {/* Social Links */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white">Connect With Me</h3>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="p-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 hover:scale-110 transition-all duration-300 group"
                    style={{ animationDelay: `${600 + index * 100}ms` }}
                  >
                    <social.icon className="text-gray-400 group-hover:text-white transition-colors duration-300" size={20} />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              {[
                { number: '24h', label: 'Response Time' },
                { number: '50+', label: 'Projects Done' },
                { number: '100%', label: 'Satisfaction' }
              ].map((stat, index) => (
                <div key={stat.label} className="text-center p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                  <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    {stat.number}
                  </div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className={`transform transition-all duration-1000 delay-400 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'}`}>
            <div className="relative">
              {/* Form background with glassmorphism */}
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-cyan-600/20 rounded-2xl blur-xl opacity-70"></div>
              
              <div 
                ref={formRef}
                className="relative space-y-6 p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl"
              >
                <h3 className="text-2xl font-semibold text-white mb-6">Send a Message</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <Input 
                    name="name" 
                    placeholder="Your Name" 
                    value={form.name} 
                    onChange={handleChange} 
                    required 
                    icon={User}
                  />
                  <Input 
                    name="email" 
                    type="email" 
                    placeholder="Your Email" 
                    value={form.email} 
                    onChange={handleChange} 
                    required 
                    icon={Mail}
                  />
                </div>
                
                <Input 
                  name="subject" 
                  placeholder="Project Subject" 
                  value={form.subject} 
                  onChange={handleChange} 
                  required 
                  icon={MessageSquare}
                />
                
                <div className="relative group">
                  <MessageSquare className="absolute left-3 top-4 text-gray-400 group-focus-within:text-blue-400 transition-colors duration-300" size={18} />
                  <textarea 
                    name="message" 
                    rows={5} 
                    placeholder="Tell me about your project..." 
                    value={form.message} 
                    onChange={handleChange} 
                    className="w-full pl-10 pr-4 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:bg-white/10 resize-none" 
                    required 
                  />
                </div>
                
                <Input 
                  name="budget" 
                  placeholder="Project Budget (Optional)" 
                  value={form.budget} 
                  onChange={handleChange} 
                  icon={DollarSign}
                />
                
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin" size={18} />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Send Message
                    </>
                  )}
                </Button>

                {/* Status Messages */}
                {status && (
                  <div className={`flex items-center gap-2 p-4 rounded-xl transition-all duration-300 ${
                    status === 'success' 
                      ? 'bg-green-500/20 border border-green-500/30 text-green-400' 
                      : 'bg-red-500/20 border border-red-500/30 text-red-400'
                  }`}>
                    {status === 'success' ? (
                      <>
                        <CheckCircle size={18} />
                        <span>Message sent successfully! I'll get back to you soon.</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle size={18} />
                        <span>Error sending message. Please try again.</span>
                      </>
                    )}
                  </div>
                )}
                              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className={`text-center mt-16 transform transition-all duration-1000 delay-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="inline-flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-white/10 rounded-full">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-gray-300">Available for new projects</span>
          </div>
        </div>
      </div>
    </section>
  );
}