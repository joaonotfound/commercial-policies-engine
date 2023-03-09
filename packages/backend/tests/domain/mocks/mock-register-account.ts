import { faker } from '@faker-js/faker'
import { RegisterAccount } from '@/domain'

export const mockRegisterAccount = (): RegisterAccount => ({
  email: faker.internet.email(),
  username: faker.internet.userName(),
  password: faker.internet.password()
})
