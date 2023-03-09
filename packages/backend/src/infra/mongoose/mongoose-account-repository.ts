import { accountSchema } from './schemas'
import {
  AddAccountRepository,
  FindAccountByUsername,
  FindAccountsByEmail
} from '@/data'
import { Account, RegisterAccount } from '@/domain'

export class MongooseAccountRepository
  implements FindAccountByUsername, FindAccountsByEmail, AddAccountRepository
{
  async addAccount(account: RegisterAccount): Promise<boolean> {
    try {
      await accountSchema.create(account)
      return true
    } catch {
      return false
    }
  }

  async findAccountByUsername(username: string): Promise<Account[]> {
    try {
      return await accountSchema.find({ username })
    } catch {
      return []
    }
  }

  async findAccountByEmail(email: string): Promise<Account | null> {
    try {
      const [account] = await accountSchema.find({ email })
      return account === undefined ? null : (account as Account)
    } catch {
      return null
    }
  }
}
