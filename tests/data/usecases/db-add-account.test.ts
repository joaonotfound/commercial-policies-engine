import { MockFindAccountByUsername } from '../mocks'
import { Account, PublicAccount, RegisterAccount, Result } from '@/domain'
import { mockAccount, mockRegisterAccount } from '@/tests/domain'
import { ok, error, FindAccountByUsername } from '@/data'

interface FindAccountsByEmail {
  findAccountByEmail(email: string): Promise<Account | null>
}

class MockFindAccountByEmail implements FindAccountsByEmail {
  mockFindAccountByEmailCall(response: Account | null) {
    jest
      .spyOn(this as FindAccountsByEmail, 'findAccountByEmail')
      .mockResolvedValueOnce(response)
  }

  // eslint-disable-next-line require-await
  async findAccountByEmail(_: string): Promise<Account | null> {
    return null
  }
}
export class DatabaseAddAccount {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    private readonly findAccountByUsername: FindAccountByUsername,
    private readonly findAccountByEmail: FindAccountsByEmail
  ) {}

  async addAccount(
    account: RegisterAccount
  ): Promise<Result<PublicAccount, string>> {
    const [existentUsername] =
      await this.findAccountByUsername.findAccountByUsername(account.username)
    if (existentUsername !== undefined) {
      return error('username already in use.')
    }
    const existentEmail = await this.findAccountByEmail.findAccountByEmail(
      account.email
    )
    if (existentEmail !== null) {
      return error('email already in use.')
    }
    return ok({
      username: account.username
    })
  }
}

const makeSut = () => {
  const findAccountByUsername = new MockFindAccountByUsername()
  const findAccountByEmail = new MockFindAccountByEmail()
  const sut = new DatabaseAddAccount(findAccountByUsername, findAccountByEmail)
  return { sut, findAccountByUsername }
}

describe('DatabaseAddAccount', () => {
  test('should return account with username already exists.', async () => {
    const { sut, findAccountByUsername } = makeSut()
    findAccountByUsername.mockFindAccountByUsername([mockAccount()])

    const response = await sut.addAccount(mockRegisterAccount())

    expect(response).toEqual(error('username already in use.'))
  })

  test('should return public account.', async () => {
    const { sut } = makeSut()
    const mockedAccount = mockRegisterAccount()

    const response = await sut.addAccount(mockedAccount)

    expect(response).toEqual(
      ok<PublicAccount>({ username: mockedAccount.username })
    )
  })
  test('should call find account by username', async () => {
    const { sut, findAccountByUsername } = makeSut()
    const spy = jest.spyOn(findAccountByUsername, 'findAccountByUsername')
    const mockedAccount = mockRegisterAccount()

    await sut.addAccount(mockedAccount)

    expect(spy).toBeCalledWith(mockedAccount.username)
  })
  test('should call find account by email', async () => {
    const { sut, findAccountByUsername } = makeSut()
    const spy = jest.spyOn(findAccountByUsername, 'findAccountByUsername')
    const mockedAccount = mockRegisterAccount()

    await sut.addAccount(mockedAccount)

    expect(spy).toBeCalledWith(mockedAccount.username)
  })
})
