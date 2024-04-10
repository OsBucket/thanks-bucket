import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    // line break
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/presentation/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      borderRadius: {
        '3xl': '20px',
        '4xl': '29px',
        '5xl': '35px'
      },
      colors: {
        white: '#FFFFFF',
        black: '#000000',
        gray: {
          900: '#222222',
          800: '#424242',
          700: '#616161',
          500: '#9E9E9E',
          400: '#BDBDBD',
          300: '#E0E0E0',
          200: '#EEEEEE'
        },
        red: {
          500: '#EF2B2A'
        },
        blue: {
          500: '#067DFD'
        },
        green: {
          500: '#00C400'
        },
        purple: {
          300: '#CE95F8'
        }
      },
      keyframes: {
        'bottom-sheet-up': {
          '0%': { transform: 'translateY(420px)' },
          '100%': { transform: 'translateY(0)' }
        },
        'bottom-sheet-down': {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(420px)' }
        }
      }
    }
  },
  plugins: []
};
export default config;
