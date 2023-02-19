/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  purge: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  darkMode: 'class',
  theme: {
    colors: {
      primary: {
        d2: '#004AD7',
        d1: '#0053F0',
        DEFAULT: '#0B5FFF',
        l1: '#80ACFF',
        l2: '#B3CDFF',
        l3: '#F0F5FF',
      },
      dark: {
        d2: '#111116',
        d1: '#1C1C24',
        DEFAULT: '#272833',
        l1: '#30313F',
        l2: '#393A4A',
      },
      error: {
        d2: '#AB1010',
        d1: '#C31212',
        DEFAULT: '#DA1414',
        l1: '#F48989',
        l2: '#FEEFEF',
      },
      success: {
        d2: '#1C5629',
        d1: '#226A33',
        DEFAULT: '#287D3C',
        l1: '#5ACA75',
        l2: '#EDF9F0',
      },
      warning: {
        d2: '#863A00',
        d1: '9F4500',
        DEFAULT: '#B95000',
        l1: '#FF8F39',
        l2: '#FFF4EC',
      },
      info: {
        d2: '#234584',
        d1: '#294F98',
        DEFAULT: '#2E5AAC',
        l1: '#89A7E0',
        l2: '#EEF2FA',
      },
      light: {
        d2: '#D3D6E0',
        d1: '#E2E4EA',
        DEFAULT: '#F1F2F5',
        l1: '#F7F8F9',
        l2: '#FFFFFF',
      },
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
