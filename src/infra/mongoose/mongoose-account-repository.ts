import { accountSchema } from './schemas'
import { FindAccountByUsername } from '@/data'
import { Account } from '@/domain'

export class MongooseAccountRepository implements FindAccountByUsername {
  async findAccountByUsername(username: string): Promise<Account[]> {
    return await accountSchema.find({ username })
  }
}
