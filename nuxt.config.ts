import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss'],
  css: ['@fortawesome/fontawesome-svg-core/styles.css'],
  components: ['src/view/components'],
  dir: {
    pages: 'src/view/pages',
    assets: 'src/view/assets',
    layouts: 'src/view/layouts',
    public: 'src/view/public',
    plugins: 'src/view/plugins'
  },
  appDir: 'src/view',
  runtimeConfig: {
    mongoUrl: process.env.MONGO_URL
  },
  plugins: [],
  nitro: {
    srcDir: 'src/server',
    plugins: ['initialize-mongoose.ts']
  }
})
