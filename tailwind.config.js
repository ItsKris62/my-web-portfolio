/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: { 
        serif: ['Playfair Display','serif'],
        sans: ['Inter','sans-serif'] 
      },
      colors: {
        primary: '#FF6A3D',
        secondary: '#9B5DE5',
        accent: '#00BFA6',
        background: {
          dark: '#0F172A',
          mid:  '#1E293B',
        },
        text: {
          primary:   '#F1F5F9',
          secondary: '#64748B',
        },
        highlight: '#FBBF24',
        success:   '#10B981',
        warning:   '#F59E0B',
        error:     '#EF4444',
      },
      backgroundImage: {
        'gradient-primary-secondary': 'linear-gradient(135deg, #FF6A3D 0%, #9B5DE5 100%)',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out', 
        'fade-in-left': 'fadeInLeft 0.6s ease-out',
        parallax: 'parallax 20s ease-in-out infinite', 
        float: 'float 6s ease-in-out infinite'
      },
      keyframes: {
        fadeInUp: { '0%': { opacity: '0', transform: 'translateY(30px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        fadeInLeft: { '0%': { opacity: '0', transform: 'translateX(-30px)' }, '100%': { opacity: '1', transform: 'translateX(0)' } },
        parallax: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-20px)' } },
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } }
      },
      // Moved backdropBlur inside extend to preserve defaults
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
      }
    }
  },
  plugins: [],
}

