import { makeAuthentication } from '../usecases'
import { LoginController } from '@/presentation'

export const makeLoginController = () => {
  return new LoginController(makeAuthentication())
}
