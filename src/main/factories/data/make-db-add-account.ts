import { makeMd5Hasher } from '../make-md5-hasher'
import { makeMongooseAccountRepository } from '../make-mongoose-account-repository'
import { DatabaseAddAccount } from '@/data'

export const makeDbAddAccount = () => {
  const accountRepository = makeMongooseAccountRepository()
  return new DatabaseAddAccount(
    accountRepository,
    accountRepository,
    accountRepository,
    makeMd5Hasher()
  )
}
