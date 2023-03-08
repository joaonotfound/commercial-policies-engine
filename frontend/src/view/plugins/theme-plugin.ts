import { defineNuxtPlugin } from 'nuxt/app'
import { ref } from 'vue'
import { ThemeProvider } from '../presenters'

class ThemeProviderVue implements ThemeProvider {
  isDark = ref<boolean>(false)
  toggleDarkmode() {
    this.isDark.value = !this.isDark.value
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide('themeProvider', new ThemeProviderVue())
})
