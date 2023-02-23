import { makeDbAuthenticate } from '..'
import { LoginController } from '@/presentation'
export const makeLoginController = () => {
  return new LoginController(makeDbAuthenticate())
}
