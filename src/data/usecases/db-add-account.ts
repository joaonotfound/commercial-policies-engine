import { error, ok } from '../helpers'
import {
  AddAccountRepository,
  FindAccountByUsername,
  FindAccountsByEmail,
  Hasher
} from '../protocols'
import {
  AddAccountUsecase,
  PublicAccount,
  RegisterAccount,
  Result
} from '@/domain'

export class DatabaseAddAccount implements AddAccountUsecase {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    private readonly findAccountByUsername: FindAccountByUsername,
    private readonly findAccountByEmail: FindAccountsByEmail,
    private readonly addAcccountRepository: AddAccountRepository,
    private readonly hash: Hasher
  ) {}

  async addAccount(
    account: RegisterAccount
  ): Promise<Result<PublicAccount, string>> {
    try {
      const [existentUsername] =
        await this.findAccountByUsername.findAccountByUsername(account.username)
      if (existentUsername !== undefined) {
        return error('username already in use.')
      }
      const existentEmail = await this.findAccountByEmail.findAccountByEmail(
        account.email
      )
      if (existentEmail !== null) {
        return error('email already in use.')
      }
      const hashedPassword = await this.hash.generateHash(account.password)
      const accountWasAdded = await this.addAcccountRepository.addAccount({
        ...account,
        password: hashedPassword
      })
      return accountWasAdded
        ? ok({
            username: account.username
          })
        : error('unexpected error')
    } catch {
      return error('unexpected error')
    }
  }
}
