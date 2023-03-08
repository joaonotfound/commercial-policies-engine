import {
  CookieSessionManager,
  NuxtAuthenticate,
  NuxtRedirectToHome,
  RegxPasswordValidator,
  RegxUsernameValidator
} from '@/infra/nuxt'

import { useLoginPresenter } from '@/view'

export const makeLoginPresenter = () => {
  return useLoginPresenter(
    new RegxUsernameValidator(),
    new RegxPasswordValidator(),
    new NuxtRedirectToHome(),
    new NuxtAuthenticate(),
    new CookieSessionManager()
  )
}
