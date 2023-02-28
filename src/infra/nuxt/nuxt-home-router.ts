import { useRouter } from 'nuxt/app'
import { HomeRouter } from '@/view'

export class NuxtRedirectToHome implements HomeRouter {
  redirectToHome() {
    const router = useRouter()
    console.log('redirecting...')
    router.replace('/home')
  }
}
