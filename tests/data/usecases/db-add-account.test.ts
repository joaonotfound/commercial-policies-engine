import { MockFindAccountByUsername } from '../mocks'
import { PublicAccount, RegisterAccount, Result } from '@/domain'
import { mockRegisterAccount } from '@/tests/domain'
import { error, FindAccountByUsername } from '@/data'

export class DatabaseAddAccount {
  // eslint-disable-next-line no-useless-constructor
  constructor(private readonly findAccountByUsername: FindAccountByUsername) {}
   
  async addAccount(
    account: RegisterAccount
  ): Promise<Result<PublicAccount, string>> {
    await this.findAccountByUsername.findAccountByUsername(account.username)
    return error('username already in use.')
  }
}

const makeSut = () => {
  const findAccountByUsername = new MockFindAccountByUsername()
  const sut = new DatabaseAddAccount(findAccountByUsername)
  return { sut, findAccountByUsername }
}

describe('DatabaseAddAccount', () => {
  test('should return account with username already exists.', async () => {
    const { sut } = makeSut()

    const response = await sut.addAccount(mockRegisterAccount())

    expect(response).toEqual(error('username already in use.'))
  })
  test('should call find account by username', async () => {
    const { sut, findAccountByUsername } = makeSut()
    const spy = jest.spyOn(findAccountByUsername, 'findAccountByUsername')
    const mockedAccount = mockRegisterAccount()

    await sut.addAccount(mockedAccount)

    expect(spy).toBeCalledWith(mockedAccount.username)
  })
})
