import { useRouter } from 'vue-router'
import { HomeRouter } from '@/view/protocols'

export class NuxtRedirectToHome implements HomeRouter {
  redirectToHome(): void {
    const router = useRouter()
    router.replace('/home')
  }
}
