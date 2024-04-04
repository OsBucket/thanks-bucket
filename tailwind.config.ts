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
        text: {
          textGray: '#9E9E9E',
          gray: {
            400: '#BDBDBD'
          }
        },
        error: '#EF2B2A'
      },
      backgroundImage: {
        'check-on': "url('//images/icons/check-on.svg')"
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
