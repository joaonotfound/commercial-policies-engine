import { accountSchema } from './schemas'
import { FindAccountByUsername, FindAccountsByEmail } from '@/data'
import { Account } from '@/domain'

export class MongooseAccountRepository
  implements FindAccountByUsername, FindAccountsByEmail
{
  async findAccountByUsername(username: string): Promise<Account[]> {
    return await accountSchema.find({ username })
  }

  async findAccountByEmail(email: string): Promise<Account | null> {
    const [account] = await accountSchema.find({ email })
    return account === undefined ? null : (account as Account)
  }
}
