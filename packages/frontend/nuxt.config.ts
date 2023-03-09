import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', 'nuxt-monaco-editor', '@element-plus/nuxt'],
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
  runtimeConfig: {},
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
    plugins: []
  }
})