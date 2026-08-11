/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        minimi: {
          bg: '#FFFDF9',          // Soft Cream / Milk
          bgSoft: '#FFF5F7',      // Soft Pink Light Tint
          card: '#FFFFFF',        // Pure White Card
          cardHover: '#FFF9FA',   // Hover state
          pink: '#FF8BA7',        // Soft Kawaii Pink
          pinkLight: '#FFC5D3',   // Sakura Light Pink
          hotpink: '#FF477E',     // Vibrant Accent Pink
          caramel: '#C8963E',     // Warm Milk Tea Brown
          caramelLight: '#F3E5AB',// Warm Milk
          mint: '#95D5B2',        // Soft Mint Green
          mintBg: '#E8F5E9',      // Mint Soft Tint
          lavender: '#E2D4F6',    // Soft Lavender
          cream: '#FFFDF9',       // Vanilla Cream
          textDark: '#2D1F2D',    // Deep Charcoal Soft
          textMuted: '#6E5D6E',   // Muted Purple Charcoal
          borderPink: 'rgba(255, 139, 167, 0.25)',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', '"Outfit"', 'sans-serif'],
        serif: ['"Cormorant Garamond"', '"Playfair Display"', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        cute: ['"Quicksand"', '"Fredoka"', 'sans-serif'],
      },
      borderRadius: {
        '3xl': '2rem',
        '4xl': '2.5rem',
        '5xl': '3rem',
      },
      boxShadow: {
        'pink-glow': '0 10px 30px -5px rgba(255, 107, 139, 0.25)',
        'soft-card': '0 8px 30px rgba(255, 139, 167, 0.12)',
        'mint-glow': '0 10px 30px -5px rgba(149, 213, 178, 0.25)',
        'caramel-glow': '0 10px 30px -5px rgba(200, 150, 62, 0.25)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
