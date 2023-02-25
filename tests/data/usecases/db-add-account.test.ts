import { PublicAccount, RegisterAccount, Result } from '@/domain'
import { mockRegisterAccount } from '@/tests/domain'
import { error } from '@/data'

export class DatabaseAddAccount {
  // eslint-disable-next-line require-await
  async addAccount(_: RegisterAccount): Promise<Result<PublicAccount, string>> {
    return error('username already in use.')
  }
}

const makeSut = () => {
  const sut = new DatabaseAddAccount()
  return { sut }
}

describe('DatabaseAddAccount', () => {
  test('should return account with username already exists.', async () => {
    const { sut } = makeSut()

    const response = await sut.addAccount(mockRegisterAccount())

    expect(response).toEqual(error('username already in use.'))
  })
})
