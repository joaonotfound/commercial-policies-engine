/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  purge: [
    'src/view/components/**/*.{vue,js}',
    'src/view/layouts/**/*.vue',
    'src/view/pages/**/*.vue',
    'src/view/plugins/**/*.{js,ts}',
    'nuxt.config.{js,ts}'
  ],
  darkMode: 'class',
  theme: {
    colors: {
      primary: {
        d2: '#3F6CB5',
        d1: '#5E86C7',
        DEFAULT: '#81A0D3',
        l1: '#94AFD9',
        l2: '#CAD7EC',
        l3: '#F6F8FC'
      },
      secondary: {
        d3: '#A37A39',
        d2: '#B5883F',
        d1: '#C79F5E',
        DEFAULT: '##D3B481',
        l1: '#D9BF94',
        l2: '#E0CAA6',
        l3: '#ECDFCA'
      },
      dark: {
        d4: '#000000',
        d3: '#060B12',
        d2: '#111116',
        d1: '#1C1C24',
        DEFAULT: '#272833',
        l1: '#30313F',
        l2: '#393A4A'
      },
      error: {
        d2: '#AB1010',
        d1: '#C31212',
        DEFAULT: '#DA1414',
        l1: '#F48989',
        l2: '#FEEFEF'
      },
      success: {
        d2: '#1C5629',
        d1: '#226A33',
        DEFAULT: '#287D3C',
        l1: '#5ACA75',
        l2: '#EDF9F0'
      },
      warning: {
        d2: '#863A00',
        d1: '9F4500',
        DEFAULT: '#B95000',
        l1: '#FF8F39',
        l2: '#FFF4EC'
      },
      info: {
        d2: '#234584',
        d1: '#294F98',
        DEFAULT: '#2E5AAC',
        l1: '#89A7E0',
        l2: '#EEF2FA'
      },
      light: {
        d2: '#D3D6E0',
        d1: '#E2E4EA',
        DEFAULT: '#F1F2F5',
        l1: '#F7F8F9',
        l2: '#FFFFFF'
      }
    },
    extend: {}
  },
  variants: {
    extend: {}
  },
  plugins: []
}
