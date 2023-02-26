import {
  MockAddAccountRepository,
  MockFindAccountByEmail,
  MockFindAccountByUsername,
  MockHasher
} from '../mocks'
import { PublicAccount } from '@/domain'
import { mockAccount, mockRegisterAccount } from '@/tests/domain'
import { ok, error, DatabaseAddAccount } from '@/data'

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
