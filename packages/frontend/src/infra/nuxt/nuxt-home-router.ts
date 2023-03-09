import { navigateTo } from 'nuxt/app'
import { HomeRouter } from '@/view'

export class NuxtRedirectToHome implements HomeRouter {
  redirectToHome() {
    navigateTo('/home')
  }
}
