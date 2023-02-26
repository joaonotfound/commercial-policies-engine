import { makeJwtTokenRepository } from '../make-jwt-token-repository'
import { makeDbAddAccount } from '../data/make-db-add-account'
import { JoiValidateSchema } from '@/infra'
import { SignupController } from '@/presentation'

export const makeSignupController = () => {
  return new SignupController(
    new JoiValidateSchema(),
    makeDbAddAccount(),
    makeJwtTokenRepository()
  )
}
