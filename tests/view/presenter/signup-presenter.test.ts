import {
  MockHomeRouter,
  MockSaveSession,
  MockSignup,
  MockValidator
} from '../mocks'
import { useSignupPresenter } from '@/view'
import { error, ok } from '@/data'

const makeSut = () => {
  const validator = new MockValidator()
  const homeRouter = new MockHomeRouter()
  const signup = new MockSignup()
  const saveSession = new MockSaveSession()

  const sut = useSignupPresenter(
    validator,
    validator,
    validator,
    homeRouter,
    signup,
    saveSession
  )

  return {
    validator,
    homeRouter,
    signup,
    saveSession,
    sut
  }
}

describe('Login presenter', () => {
  test('should call signup method', async () => {
    const { sut, signup } = makeSut()
    const authSpy = jest.spyOn(signup, 'signup')

    await sut.signup()

    expect(authSpy).toBeCalled()
  })
  test('should emit error if signup method returns error', async () => {
    const { sut, signup } = makeSut()
    signup.mockSignupCall(error('error-message'))

    await sut.signup()

    expect(sut.mainError.value).toBe('error-message')
  })
  test('should call saveSession method', async () => {
    const { sut, signup, saveSession } = makeSut()
    const mockedSession = { accessToken: 'any-token' }
    signup.mockSignupCall(ok(mockedSession))
    const sessionSpy = jest.spyOn(saveSession, 'saveSession')

    await sut.signup()

    expect(sessionSpy).toBeCalledWith(mockedSession)
  })
  test('should redirect to home page', async () => {
    const { sut, signup, homeRouter } = makeSut()
    const mockedSession = { accessToken: 'any-token' }
    signup.mockSignupCall(ok(mockedSession))
    const homeRouterSpy = jest.spyOn(homeRouter, 'redirectToHome')

    await sut.signup()

    expect(homeRouterSpy).toBeCalled()
  })
  test('should return unexpected error if it throws', async () => {
    const { sut, signup, saveSession } = makeSut()
    const mockedSession = { accessToken: 'any-token' }
    signup.mockSignupCall(ok(mockedSession))
    jest.spyOn(saveSession, 'saveSession').mockRejectedValueOnce('')

    await sut.signup()

    expect(sut.mainError.value).toBe('unexpected error')
  })
})
