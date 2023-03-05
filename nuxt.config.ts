import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', 'nuxt-monaco-editor'],
  css: ['@fortawesome/fontawesome-svg-core/styles.css'],
  components: ['view/components'],
  dir: {
    pages: 'view/pages',
    assets: 'view/assets',
    layouts: 'view/layouts',
    public: 'view/public',
    plugins: 'view/plugins'
  },
  srcDir: 'src/',
  runtimeConfig: {
    mongoUrl: process.env.MONGO_URL
  },
  build: {
    transpile:
      process.env.NODE_ENV === 'production'
        ? [
            'naive-ui',
            'vueuc',
            '@css-render/vue3-ssr',
            '@juggle/resize-observer'
          ]
        : ['@juggle/resize-observer']
  },
  plugins: [
    '~/view/plugins/middleware-plugins.ts',
    '~/main/main-plugin.ts',
    '~/view/plugins/icons-plugin.ts',
    '~/view/plugins/theme-plugin.ts',
    '~/view/plugins/sidebar-plugin.ts',
    '~/view/plugins/sidebar-plugin.ts'
  ],
  nitro: {
    srcDir: 'src/server',
    plugins: ['initialize-mongoose.ts']
  }
})
