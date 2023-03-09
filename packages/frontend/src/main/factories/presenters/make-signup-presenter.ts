import { JoiValidatorEmail } from '@/infra/joi'
import {
  CookieSessionManager,
  NuxtCreateAccount,
  NuxtRedirectToHome,
  RegxPasswordValidator,
  RegxUsernameValidator
} from '@/infra/nuxt'
import { useSignupPresenter } from '@/view'

export const makeSignupPresenteer = () => {
  return useSignupPresenter(
    new JoiValidatorEmail(),
    new RegxUsernameValidator(),
    new RegxPasswordValidator(),
    new NuxtRedirectToHome(),
    new NuxtCreateAccount(),
    new CookieSessionManager()
  )
}
