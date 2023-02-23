import { MongooseAccountRepository } from '@/infra'

export const makeMongooseAccountRepository = () => {
  return new MongooseAccountRepository()
}
