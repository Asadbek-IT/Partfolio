/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          DEFAULT: '#050505',
          lighter: '#0a0a0a',
          card: '#0f0f0f',
        },
        accent: {
          cyan: '#00d9ff',
          indigo: '#4f46e5',
          purple: '#8b5cf6',
          pink: '#ec4899',
        },
      },
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      fontSize: {
        'hero': 'clamp(3rem, 10vw, 8rem)',
        'section': 'clamp(2rem, 6vw, 4rem)',
      },
      animation: {
        'marquee': 'marquee 40s linear infinite',
        'glow': 'glow 3s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        glow: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'mesh-gradient': 'radial-gradient(at 40% 20%, hsla(234, 100%, 70%, 0.3) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(189, 100%, 56%, 0.3) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(271, 100%, 71%, 0.3) 0px, transparent 50%), radial-gradient(at 80% 50%, hsla(340, 100%, 76%, 0.3) 0px, transparent 50%), radial-gradient(at 0% 100%, hsla(234, 100%, 70%, 0.3) 0px, transparent 50%), radial-gradient(at 80% 100%, hsla(189, 100%, 56%, 0.3) 0px, transparent 50%)',
      },
    },
  },
  plugins: [],
}
