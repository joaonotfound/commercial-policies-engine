import { error, ok } from '@/data'
import { Account, DomainError } from '@/domain'
import { HttpResponse, LoginController } from '@/presentation'
import { mockAccount, MockAuthenticationUsecase } from '@/tests/domain'

const makeSut = () => {
  const authentication = new MockAuthenticationUsecase()
  const sut = new LoginController(authentication)
  return { authentication, sut }
}

describe('LoginController', () => {
  test('should return credentials param error if no username is provided', async () => {
    const { sut } = makeSut()
    const account: Account = { ...mockAccount(), username: '' }

    const response = await sut.handle(account)

    expect(response).toEqual(HttpResponse.badRequest('Missing credentials'))
  })
  test('should return credentials param error if no password is provided', async () => {
    const { sut } = makeSut()
    const account: Account = { ...mockAccount(), password: '' }

    const response = await sut.handle(account)

    expect(response).toEqual(HttpResponse.badRequest('Missing credentials'))
  })
  test('should return credentials param error if param is undefined', async () => {
    const { sut } = makeSut()

    const response = await sut.handle(undefined!)

    expect(response).toEqual(HttpResponse.badRequest('Missing credentials'))
  })
  test('should call authentication method on valid arguments', async () => {
    const { sut, authentication } = makeSut()
    const spy = authentication.getSpy()
    const mockedAccount = mockAccount()

    await sut.handle(mockedAccount)

    expect(spy).toBeCalledWith(mockedAccount)
  })
  test('should return unexpected error if authentication fails', async () => {
    const { sut, authentication } = makeSut()
    authentication.mockAuthenticateCall(error(DomainError.unexpectedError))

    const response = await sut.handle(mockAccount())

    expect(response).toEqual(
      HttpResponse.unauthorize(DomainError.unexpectedError)
    )
  })
  test('should return session on authentication', async () => {
    const { sut, authentication } = makeSut()
    const session = {
      accessToken: 'random-access-token'
    }
    authentication.mockAuthenticateCall(ok(session))

    const response = await sut.handle(mockAccount())

    expect(response).toEqual(HttpResponse.authorize(session))
  })
})
