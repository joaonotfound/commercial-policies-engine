import {
  Account,
  AuthenticateUsecase,
  DomainError,
  Result,
  Session
} from '../../domain'
import { error, ok } from '../helpers'
import {
  FindAccountByUsername,
  GenerateAccessToken,
  Hasher
} from '../protocols'
export class DbAuthenticate implements AuthenticateUsecase {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    private readonly findAccount: FindAccountByUsername,
    private readonly hasher: Hasher,
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
      const hashedPassword = await this.hasher.generateHash(password)
      if (account.password !== hashedPassword) {
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
