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
      boxShadow: {
        custom: '0px 0px 12px 0px rgba(0, 0, 0, 0.5)'
      },
      backgroundImage: {
        'custom-gradient':
          'linear-gradient(to left, rgba(255, 0, 17, 1), rgba(255, 0, 252, 1), rgba(0, 1, 255, 1), rgba(22, 236, 232, 1), rgba(24, 255, 0, 1), rgba(255, 247, 0, 1), rgba(255, 16, 1, 1))'
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
          500: '#EF2B2A',
          100: '#FDE1DF'
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
