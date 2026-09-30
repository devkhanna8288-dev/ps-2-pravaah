/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        teal: {
          DEFAULT: '#2A9D8F',
          tint: '#E8F5F3',
          hover: '#238276',
        },
        navy: {
          DEFAULT: '#1E3A5F',
          dark: '#142842',
        },
        gold: '#C59B27',
        amber: {
          DEFAULT: '#F4A261',
          tint: '#FEF6EE',
        },
        coral: {
          DEFAULT: '#E76F51',
          tint: '#FDF0ED',
        },
        porcelain: '#F7F9FB',
        surface: {
          DEFAULT: '#FFFFFF',
          outline: '#E2E8F0',
          hover: '#CBD5E1'
        },
        slate: {
          DEFAULT: '#64748B',
          dark: '#1E293B',
        }
      },
      fontFamily: {
        sans: ['Public Sans', 'sans-serif'],
        headline: ['Atkinson Hyperlegible Next', 'sans-serif'],
      },
      borderRadius: {
        'md': '8px',
        'xl': '12px',
        'full': '9999px',
      },
      boxShadow: {
        'card': '0 1px 3px rgba(30, 41, 59, 0.04), 0 4px 12px rgba(30, 41, 59, 0.02)',
        'hover': '0 8px 24px rgba(42, 157, 143, 0.08), 0 2px 6px rgba(30, 41, 59, 0.04)',
        'modal': '0 20px 40px -8px rgba(20, 40, 66, 0.16)',
      }
    },
  },
  plugins: [],
}
