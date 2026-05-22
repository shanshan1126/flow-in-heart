/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'deep-space': {
          800: '#1A1528',
          700: '#221C38',
          600: '#2D2448',
          500: '#3A2E58',
          400: '#4A3A6E',
        },
        'violet-glow': {
          400: '#C4B5FD',
          500: '#A78BFA',
          600: '#8B5CF6',
        },
        'warm-amber': {
          400: '#FCD34D',
          500: '#FBBF24',
          600: '#F59E0B',
        },
        'cloud-white': '#F1F5F9',
        'text-dim': 'rgba(241, 245, 249, 0.6)',
        'danger': '#F43F5E',
      },
      fontFamily: {
        mono: ['DIN Alternate', 'Roboto Mono', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
        sans: ['PingFang SC', 'Noto Sans SC', 'Inter', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      borderRadius: {
        'xl': '24px',
        '2xl': '32px',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'breathe-glow': 'breathe-glow 8s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'gradient-shift': 'gradient-shift 8s ease infinite',
        'twinkle': 'twinkle 3s ease-in-out infinite',
        'slide-up': 'slide-up 0.4s ease-in-out',
        'collapse': 'collapse 0.6s ease-in-out forwards',
      },
      backgroundImage: {
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
}