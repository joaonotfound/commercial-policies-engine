module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: [
    'plugin:nuxt/recommended',
    'prettier',
    '@nuxtjs/eslint-config-typescript'
  ],
  rules: {
    'no-console': 'off'
  },
  plugins: ['jest']
}
