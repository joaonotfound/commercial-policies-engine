import {
  FindAccountByUsername,
  GenerateAccessToken,
  error,
  ok,
  HashComparer
} from '@/data'
import {
  Account,
  AuthenticationUsecase,
  DomainError,
  Result,
  Session
} from '@/domain'

export class DbAuthentication implements AuthenticationUsecase {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    private readonly findAccount: FindAccountByUsername,
    private readonly hashComparer: HashComparer,
    private readonly generateTokenRepository: GenerateAccessToken
  ) {}

  async authenticate({
    username,
    password
  }: Account): Promise<Result<Session, DomainError>> {
    try {
      const [account] = await this.findAccount.findAccountByUsername(username)
      if (account) {
        const isValid = await this.hashComparer.compareHash(
          password,
          account.password
        )
        if (!isValid) {
          return error(DomainError.invalidCredentials)
        }
        return ok({
          accessToken: await this.generateTokenRepository.generateAccessToken(
            account
          )
        })
      }

      return error(DomainError.invalidCredentials)
    } catch (err) {
      console.log('an unexpected error ocurred.', err)
      return error(DomainError.unexpectedError)
    }
  }
}
