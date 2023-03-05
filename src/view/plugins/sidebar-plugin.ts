import { defineNuxtPlugin } from 'nuxt/app'
import { ref } from 'vue'
import { SidebarProvider } from '../presenters'

class NuxtSidebarProvider implements SidebarProvider {
  opened = ref<boolean>(false)
  setOpened() {
    this.opened.value = !this.opened.value
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide('sidebarProvider', new NuxtSidebarProvider())
})
