import { FindAccountByUsername } from '../../data'
import { Account } from '../../domain'
import { accountSchema } from './schemas'

export class MongooseAccountRepository implements FindAccountByUsername {
  async findAccountByUsername(username: string): Promise<Account[]> {
    return await accountSchema.find({ username })
  }
}
