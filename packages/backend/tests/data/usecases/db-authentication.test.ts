/* eslint-disable require-await */
import { DbAuthentication, error } from '@/data'
import {
  MockFindAccountByUsername,
  MockGenerateAccessToken,
  MockHashComparer
} from '@/tests/data'
import { mockAccount } from '@/tests/domain'
import { DomainError } from '@/domain'

const makeSut = () => {
  const findAccountMock = new MockFindAccountByUsername()
  const comparerHash = new MockHashComparer()
  const generateTokenMock = new MockGenerateAccessToken()
  const sut = new DbAuthentication(
    findAccountMock,
    comparerHash,
    generateTokenMock
  )
  return { sut, findAccountMock, comparerHash, generateTokenMock }
}

describe('db authenticate usecase', () => {
  test('should return domain error if no username is provided', async () => {
    const { sut } = makeSut()

    const response = await sut.authenticate(mockAccount())

    expect(response).toEqual(error(DomainError.invalidCredentials))
  })
  test('should return invalid credentials if no account was find', async () => {
    const { sut, findAccountMock } = makeSut()
    findAccountMock.mockFindAccountByUsername([])

    const response = await sut.authenticate(mockAccount())

    expect(response).toEqual(error(DomainError.invalidCredentials))
  })
  test('should return invalid credentials if credentials doesnt match', async () => {
    const { sut, findAccountMock, comparerHash } = makeSut()
    const mockedAccount = mockAccount()
    findAccountMock.mockFindAccountByUsername([mockedAccount])
    comparerHash.mockComparerHash(false)

    const response = await sut.authenticate(mockedAccount)

    expect(response).toEqual(error(DomainError.invalidCredentials))
  })
  test('should return unexpected error if throws', async () => {
    const { sut, findAccountMock } = makeSut()
    const mockedAccount = mockAccount()
    jest
      .spyOn(findAccountMock, 'findAccountByUsername')
      .mockImplementation(async () => {
        throw SyntaxError
      })

    const response = await sut.authenticate(mockedAccount)

    expect(response).toEqual(error(DomainError.unexpectedError))
  })
  test('should return access token if account exists with correct password', async () => {
    const { sut, findAccountMock, generateTokenMock, comparerHash } = makeSut()
    const mockedAccount = mockAccount()
    findAccountMock.mockFindAccountByUsername([
      Object.assign({}, mockedAccount, { password: 'valid-hash' })
    ])
    comparerHash.mockComparerHash(true)
    generateTokenMock.mockGenerateAccessToken('valid-access-token')

    const response = await sut.authenticate(mockedAccount)

    expect(response).toEqual({
      ok: true,
      value: {
        accessToken: 'valid-access-token'
      }
    })
  })
})
