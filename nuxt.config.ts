export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss'],
  css: ['@fortawesome/fontawesome-svg-core/styles.css'],
  runtimeConfig: {
    mongoUrl: process.env.MONGO_URL
  },
  nitro: {
    plugins: ['~/server/initialize-mongoose.ts']
  }
})
