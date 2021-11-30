module.exports = {
  purge: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './_posts/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem'
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: '#000',
      gray: {
        light: '#eee',
        DEFAULT: '#999',
        dark: '#666'
      },
      white: '#fff',
      blue: 'var(--color-primary)',
      primary: 'var(--color-primary)'
    },
    fontFamily: {
      'inter': ['Inter', 'ui-sans-serif']
    },
    padding: {
      '0': '0',
      'sm': '5px',
      'md': '10px',
      'lg': '20px',
      'xl': '40px'
    },
    margin: {
      '0': '0',
      'sm': '5px',
      'md': '10px',
      'lg': '20px',
      'xl': '40px'
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
