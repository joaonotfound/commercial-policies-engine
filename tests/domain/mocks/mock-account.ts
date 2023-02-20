import { faker } from '@faker-js/faker'
import { Account } from '../../../server/domain'

export const mockAccount = (): Account => ({
  username: faker.internet.userName(),
  password: faker.internet.password()
})
