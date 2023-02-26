import { MockFindAccountByUsername, MockHasher } from '../mocks'
import { Account, PublicAccount, RegisterAccount, Result } from '@/domain'
import { mockAccount, mockRegisterAccount } from '@/tests/domain'
import {
  ok,
  error,
  FindAccountByUsername,
  AddAccountRepository,
  Hasher
} from '@/data'

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
export class MockAddAccountRepository implements AddAccountRepository {
  mockAddAccountError(error: string) {
    jest
      .spyOn(this as AddAccountRepository, 'addAccount')
      // eslint-disable-next-line require-await
      .mockImplementationOnce(async () => {
        throw error
      })
  }

  mockAddAccountCall(response: boolean) {
    jest
      .spyOn(this as AddAccountRepository, 'addAccount')
      .mockResolvedValueOnce(response)
  }

  // eslint-disable-next-line require-await
  async addAccount(_: RegisterAccount): Promise<boolean> {
    return true
  }
}
export class DatabaseAddAccount {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    private readonly findAccountByUsername: FindAccountByUsername,
    private readonly findAccountByEmail: FindAccountsByEmail,
    private readonly addAcccountRepository: AddAccountRepository,
    private readonly hash: Hasher
  ) {}

  async addAccount(
    account: RegisterAccount
  ): Promise<Result<PublicAccount, string>> {
    try {
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
      const hashedPassword = await this.hash.generateHash(account.password)
      const accountWasAdded = await this.addAcccountRepository.addAccount({
        ...account,
        password: hashedPassword
      })
      return accountWasAdded
        ? ok({
            username: account.username
          })
        : error('unexpected error')
    } catch {
      return error('unexpected error')
    }
  }
}

const makeSut = () => {
  const findAccountByUsername = new MockFindAccountByUsername()
  const findAccountByEmail = new MockFindAccountByEmail()
  const addAccountRepository = new MockAddAccountRepository()
  const hash = new MockHasher()
  const sut = new DatabaseAddAccount(
    findAccountByUsername,
    findAccountByEmail,
    addAccountRepository,
    hash
  )
  return { sut, findAccountByUsername, addAccountRepository, hash }
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
  test('should call add account method', async () => {
    const { sut, addAccountRepository } = makeSut()
    const spy = jest.spyOn(addAccountRepository, 'addAccount')
    const mockedAccount = mockRegisterAccount()

    await sut.addAccount(mockedAccount)

    expect(spy).toBeCalled()
  })
  test('should hash password', async () => {
    const { sut, hash } = makeSut()
    const spy = jest.spyOn(hash, 'generateHash')
    const mockedAccount = mockRegisterAccount()

    await sut.addAccount(mockedAccount)

    expect(spy).toBeCalledWith(mockedAccount.password)
  })
  test('should call add account method with correct values', async () => {
    const { sut, addAccountRepository, hash } = makeSut()
    const hashedPassword = 'hashed-password'
    hash.mockGenerateHash(hashedPassword)
    const spy = jest.spyOn(addAccountRepository, 'addAccount')
    const mockedAccount = mockRegisterAccount()

    await sut.addAccount(mockedAccount)

    expect(spy).toBeCalledWith(
      Object.assign({ ...mockedAccount, password: hashedPassword })
    )
  })
  test('should return unexpected error if method throws', async () => {
    const { sut, addAccountRepository } = makeSut()
    addAccountRepository.mockAddAccountError('random-error')

    const response = await sut.addAccount(mockRegisterAccount())

    expect(response).toEqual(error('unexpected error'))
  })
  test('should return unexpected error if add account returns false', async () => {
    const { sut, addAccountRepository } = makeSut()
    addAccountRepository.mockAddAccountCall(false)

    const response = await sut.addAccount(mockRegisterAccount())

    expect(response).toEqual(error('unexpected error'))
  })
})
