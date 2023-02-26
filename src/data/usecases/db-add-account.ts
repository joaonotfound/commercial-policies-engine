import { createLevelError, error, ok } from '../helpers'
import {
  AddAccountRepository,
  FindAccountByUsername,
  FindAccountsByEmail,
  Hasher
} from '../protocols'
import { AddAccountUsecase, RegisterAccount } from '@/domain'

export class DatabaseAddAccount implements AddAccountUsecase {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    private readonly findAccountByUsername: FindAccountByUsername,
    private readonly findAccountByEmail: FindAccountsByEmail,
    private readonly addAcccountRepository: AddAccountRepository,
    private readonly hash: Hasher
  ) {}

  private async findConflictFields(account: RegisterAccount) {
    const [existingUsername] =
      await this.findAccountByUsername.findAccountByUsername(account.username)
    if (existingUsername) {
      return DatabaseAddAccount.usernameConflict
    }

    const existingEmail = await this.findAccountByEmail.findAccountByEmail(
      account.email
    )
    if (existingEmail) {
      return DatabaseAddAccount.emailConflict
    }
  }

  async addAccount(account: RegisterAccount) {
    const conflictField = await this.findConflictFields(account)
    if (conflictField) return conflictField

    try {
      const hashedPassword = await this.hash.generateHash(account.password)
      const accountWasAdded = await this.addAcccountRepository.addAccount({
        ...account,
        password: hashedPassword
      })
      return accountWasAdded
        ? ok({ username: account.username })
        : DatabaseAddAccount.unexpectedError
    } catch {
      return DatabaseAddAccount.unexpectedError
    }
  }
}

export namespace DatabaseAddAccount {
  const generic = (message: string) =>
    error(createLevelError('generic', message))
  const conflict = (message: string) =>
    error(createLevelError('conflict', message))

  export const usernameConflict = conflict('username already in use')
  export const emailConflict = conflict('email already exists')
  export const unexpectedError = generic('unexpected error')
}
