/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Cairo', 'system-ui', 'sans-serif'],
        display: ['Tajawal', 'Cairo', 'system-ui', 'sans-serif'],
      },
      colors: {
        navy: {
          50: '#f2f7fc',
          100: '#e2ecf7',
          200: '#c0d7ef',
          300: '#93bae3',
          400: '#6097d3',
          500: '#3d79be',
          600: '#2c5fa2',
          700: '#244d84',
          800: '#1c3f6c',
          900: '#0f2f56',
          950: '#0b2545',
        },
        gov: {
          bg: '#f4f6fa',
          dark: '#0a1424',
        },
      },
      boxShadow: {
        card: '0 1px 3px rgba(11, 37, 69, 0.06), 0 6px 18px rgba(11, 37, 69, 0.05)',
        'card-hover': '0 4px 12px rgba(11, 37, 69, 0.10), 0 12px 28px rgba(11, 37, 69, 0.08)',
        glow: '0 0 0 3px rgba(16, 185, 129, 0.15)',
      },
      borderRadius: {
        card: '1rem',
      },
      keyframes: {
        'fade-in': { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in-right': {
          '0%': { opacity: '0', transform: 'translateX(-16px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.55' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.35s ease-out both',
        'slide-up': 'slide-up 0.4s ease-out both',
        'slide-in-right': 'slide-in-right 0.4s ease-out both',
        'scale-in': 'scale-in 0.25s ease-out both',
        'pulse-soft': 'pulse-soft 1.6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
