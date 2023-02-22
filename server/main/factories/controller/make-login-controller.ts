import { LoginController } from '../../../presentation'
import { makeDbAuthenticate } from '../'
export const makeLoginController = () => {
  return new LoginController(makeDbAuthenticate())
}
