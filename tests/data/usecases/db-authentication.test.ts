/* eslint-disable require-await */
import { DbAuthentication, error } from '../../../server/data'
import {
  MockFindAccountByUsername,
  MockGenerateAccessToken,
  MockHasher
} from '../mocks'
import { DomainError } from '@/server/domain'
import { mockAccount } from '@/tests/domain/'

const makeSut = () => {
  const findAccountMock = new MockFindAccountByUsername()
  const hasherMock = new MockHasher()
  const generateTokenMock = new MockGenerateAccessToken()
  const sut = new DbAuthentication(
    findAccountMock,
    hasherMock,
    generateTokenMock
  )
  return { sut, findAccountMock, hasherMock, generateTokenMock }
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
    const { sut, findAccountMock, hasherMock } = makeSut()
    const mockedAccount = mockAccount()
    findAccountMock.mockFindAccountByUsername([mockedAccount])
    hasherMock.generateHash('random-hash')

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
    const { sut, findAccountMock, generateTokenMock, hasherMock } = makeSut()
    const mockedAccount = mockAccount()
    findAccountMock.mockFindAccountByUsername([
      Object.assign({}, mockedAccount, { password: 'valid-hash' })
    ])
    hasherMock.mockGenerateHash('valid-hash')
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
