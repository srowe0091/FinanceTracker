/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin')

module.exports = {
  darkMode: ['class'],
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Nunito Sans']
      },
      height: {
        header: 'calc(100vh - var(--sizeHeader))'
      },
      ringColor: {
        DEFAULT: 'rgba(var(--ring))'
      },
      colors: {
        border: 'rgba(var(--border))',
        input: 'rgba(var(--input))',
        background: 'rgba(var(--background))',
        foreground: 'rgba(var(--foreground))',
        primary: {
          DEFAULT: 'rgba(var(--primary))',
          foreground: 'rgba(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'rgba(var(--secondary))',
          foreground: 'rgba(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'rgba(var(--destructive))',
          foreground: 'rgba(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'rgba(var(--muted))',
          foreground: 'rgba(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'rgba(var(--accent))',
          foreground: 'rgba(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'rgba(var(--popover))',
          foreground: 'rgba(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'rgba(var(--card))',
          foreground: 'rgba(var(--card-foreground))'
        }
      },
      backgroundImage: {
        mainBackground: 'var(--main-background)',
        progressBar:
          'linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(var(--primary)) 25%, rgba(var(--primary)) 75%, rgba(0,0,0,0) 100%)'
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      boxShadow: {
        sidebar: '-5px 0 15px 0px #000',
        header: '0 -10px 15px 4px #000'
      },
      keyframes: {
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 }
        },
        fadeOut: {
          from: { opacity: 1 },
          to: { opacity: 0 }
        },
        scaleFadeIn: {
          from: {
            opacity: 0,
            transform: 'scale(0.95)'
          },
          to: {
            opacity: 1,
            transform: 'scaleX(1)'
          }
        },
        scaleFadeOut: {
          from: {
            opacity: 1,
            transform: 'scaleX(1)'
          },
          to: {
            opacity: 0,
            transform: 'scale(0.95)'
          }
        },
        backgroundPosition: {
          from: { backgroundPosition: 'left' },
          to: { backgroundPosition: 'right' }
        },
        indeterminateAnimation: {
          from: { transform: 'translateX(-90%) scaleX(0.8)' },
          to: { transform: 'translateX(90%) scaleX(0.8)' }
        },
        'accordion-down': {
          from: { opacity: 0, height: 0 },
          to: { opacity: 1, height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { opacity: 1, height: 'var(--radix-accordion-content-height)' },
          to: { height: 0, opacity: 0 }
        },
        'collapse-open': {
          from: { opacity: 0, height: 0 },
          to: { opacity: 1, height: 'var(--radix-collapsible-content-height)' }
        },
        'collapse-close': {
          from: { opacity: 1, height: 'var(--radix-collapsible-content-height)' },
          to: { height: 0, opacity: 0 }
        }
      },
      transitionDuration: {
        DEFAULT: '300ms'
      },
      animation: {
        'accordion-down': 'accordion-down 250ms ease-out',
        'accordion-up': 'accordion-up 250ms ease-out',
        'collapse-open': 'collapse-open 250ms ease-out',
        'collapse-close': 'collapse-close 250ms ease-out',
        loginBackground: 'fadeIn 2s ease, backgroundPosition 240s linear',
        indeterminateAnimation: 'indeterminateAnimation 1200ms infinite linear',
        'scale-fade-in': 'scaleFadeIn 200ms ease',
        'scale-fade-out': 'scaleFadeOut 200ms ease'
      }
    }
  },
  plugins: [
    require('tailwindcss-animate'),
    plugin(({ matchUtilities, theme }) => {
      matchUtilities(
        {
          'text-shadow': value => ({
            textShadow: value
          })
        },
        { values: theme('textShadow') }
      )
    })
  ]
}
