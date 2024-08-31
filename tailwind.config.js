function withOpacityValue(variable) {
  return ({ opacityValue }) => {
    if (opacityValue === undefined) {
      return `rgb(var(${variable}))`
    }
    return `rgb(var(${variable}) / ${opacityValue})`
  }
}

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        '3xl': '1736px',
      },
      boxShadow: {
        solid: '-30px 30px rgba(0, 0, 0, 0.1)'
      },
      colors: {
        'crmls-blue': '#0046BB',
        'nb-tan': '#BEB7A4',
        'nb-light-blue': '#ECF9FF',
        'nb-blue': '#00468B',
        'nb-yellow': '#EAC435',
      },
      textColor: {
        header: withOpacityValue('--text-header'), 
        primary: withOpacityValue('--text-primary'),
        secondary: withOpacityValue('--text-secondary'),
        tertiary: withOpacityValue('--text-tertiary'),
        inverse: withOpacityValue('--text-inverse'),
        menucollapse: withOpacityValue('--text-menucollapse'),
      },
      backgroundColor: {
        header: withOpacityValue('--bg-header'), 
        primary: withOpacityValue('--bg-primary'),
        secondary: withOpacityValue('--bg-secondary'),
        tertiary: withOpacityValue('--bg-tertiary'),
        menu: withOpacityValue('--bg-menu'),
        menucollapse: withOpacityValue('--bg-menucollapse'),
      },
      borderColor: {
        divider: withOpacityValue('--border-divider'), 
        default: withOpacityValue('--border-default'),
        dark: withOpacityValue('--border-dark'),
        header: withOpacityValue('--border-header'),
        menu: withOpacityValue('--border-menu'),
      },
      borderRadius: {
        '4xl': '2.0rem',
        '5xl': '2.5rem',
        '6xl': '3.0rem',
        '7xl': '3.5rem'
      },
      ringColor: {
        primary: withOpacityValue('--text-primary'),
        secondary: withOpacityValue('--text-secondary'),
      },
      spacing: {
        '128': '32rem',
      },
      animation: {
        fade: 'fadeIn .25s ease-in-out',
      },
      keyframes: theme => ({
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      }),
    }
  },
  variants: {
    extend: {
      cursor: ['disabled'],
      pointerEvents: ['disabled'],
      backgroundColor: ['disabled'],
      opacity: ['disabled'],
      borderWidth: ['first'],
      zIndex: ['hover', 'active']
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp'),
  ],
}


