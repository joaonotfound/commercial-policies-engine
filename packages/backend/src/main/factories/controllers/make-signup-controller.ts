import { makeDatabaseAddAccount } from '../usecases'
import { JoiValidateSchema, TokenRepository } from '@/infra'
import { SignupController } from '@/presentation'

export const makeSignupController = () => {
  const accountSchemaValidator = new JoiValidateSchema()
  const tokenRepository = new TokenRepository()
  return new SignupController(
    accountSchemaValidator,
    makeDatabaseAddAccount(),
    tokenRepository
  )
}
