import {
  Account,
  AuthenticateUsecase,
  DomainError,
  Result,
  Session
} from '../../domain'
import { error, ok } from '../helpers'
import {
  Encrypter,
  FindAccountByUsername,
  GenerateAccessToken
} from '../protocols'
export class DbAuthenticate implements AuthenticateUsecase {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    private readonly findAccount: FindAccountByUsername,
    private readonly encrypter: Encrypter,
    private readonly generataToken: GenerateAccessToken
  ) {}

  async authenticate({
    username,
    password
  }: Account): Promise<Result<Session, DomainError>> {
    try {
      if (username.length === 0 || password.length === 0) {
        return error(DomainError.invalidCredentials)
      }
      const [account] = await this.findAccount.findAccountByUsername(username)
      if (account === undefined) {
        return error(DomainError.invalidCredentials)
      }
      const encryptedPassword = await this.encrypter.encrypt(password)
      if (account.password !== encryptedPassword) {
        return error(DomainError.invalidCredentials)
      }
      const accessToken = await this.generataToken.generateAccessToken(account)
      return ok({
        accessToken
      })
    } catch {
      return error(DomainError.unexpectedError)
    }
  }
}
