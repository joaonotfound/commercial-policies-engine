import {
  MockAuthenticate,
  MockHomeRouter,
  MockSaveSession,
  MockValidator
} from '../mocks'
import { useLoginPresenter } from '@/view'
import { error, ok } from '@/data'

const makeSut = () => {
  const usernameValidator = new MockValidator()
  const passwordValidator = new MockValidator()
  const homeRouter = new MockHomeRouter()
  const authenticate = new MockAuthenticate()
  const saveSession = new MockSaveSession()

  const sut = useLoginPresenter(
    usernameValidator,
    passwordValidator,
    homeRouter,
    authenticate,
    saveSession
  )

  return {
    usernameValidator,
    passwordValidator,
    homeRouter,
    authenticate,
    saveSession,
    sut
  }
}

describe('Login presenter', () => {
  test('should call authenticate method', async () => {
    const { sut, authenticate } = makeSut()
    const authSpy = jest.spyOn(authenticate, 'authenticate')

    await sut.login()

    expect(authSpy).toBeCalled()
  })
  test('should emit error if authenticate method returns error', async () => {
    const { sut, authenticate } = makeSut()
    authenticate.mockAuthenticateCall(error('error-message'))

    await sut.login()

    expect(sut.mainError.value).toBe('error-message')
  })
  test('should call saveSession method', async () => {
    const { sut, authenticate, saveSession } = makeSut()
    const mockedSession = { accessToken: 'any-token' }
    authenticate.mockAuthenticateCall(ok(mockedSession))
    const sessionSpy = jest.spyOn(saveSession, 'saveSession')

    await sut.login()

    expect(sessionSpy).toBeCalledWith(mockedSession)
  })
  test('should redirect to home page', async () => {
    const { sut, authenticate, homeRouter } = makeSut()
    const mockedSession = { accessToken: 'any-token' }
    authenticate.mockAuthenticateCall(ok(mockedSession))
    const homeRouterSpy = jest.spyOn(homeRouter, 'redirectToHome')

    await sut.login()

    expect(homeRouterSpy).toBeCalled()
  })
  test('should return unexpected error if it throws', async () => {
    const { sut, authenticate, saveSession } = makeSut()
    const mockedSession = { accessToken: 'any-token' }
    authenticate.mockAuthenticateCall(ok(mockedSession))
    jest.spyOn(saveSession, 'saveSession').mockRejectedValueOnce('')

    await sut.login()

    expect(sut.mainError.value).toBe('unexpected error')
  })
})
