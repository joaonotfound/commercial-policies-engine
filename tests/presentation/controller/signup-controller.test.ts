/* eslint-disable require-await */
import { MockValidateRegisterAccountSchema } from '../mocks'
import { createLevelError, error } from '@/data'
import { Session } from '@/domain'
import { HttpResponse, SignupController } from '@/presentation'
import { mockRegisterAccount } from '@/tests/domain'
import { MockAddAccount, MockGenerateAccessToken } from '@/tests/data'

const makeSut = () => {
  const validateSchema = new MockValidateRegisterAccountSchema()
  const addAccount = new MockAddAccount()
  const generateAccessToken = new MockGenerateAccessToken()
  const sut = new SignupController(
    validateSchema,
    addAccount,
    generateAccessToken
  )
  return {
    sut,
    validateSchema,
    addAccount,
    generateAccessToken
  }
}
describe('SignupController', () => {
  test('should call validate schema', () => {
    const { sut, validateSchema } = makeSut()
    const spy = validateSchema.getSpy()
    const mockedAccount = mockRegisterAccount()

    sut.handle(mockedAccount)

    expect(spy).toHaveBeenCalledWith(mockedAccount)
  })
  test('should return badRequest when validating schema fails', async () => {
    const { sut, validateSchema } = makeSut()
    validateSchema.mockValidateRegisterAccountSchemaCall(false)

    const response = await sut.handle(mockRegisterAccount())

    expect(response).toEqual(HttpResponse.badRequest('missing params'))
  })
  test('should call add account with correct values', async () => {
    const { sut, addAccount } = makeSut()
    const spy = addAccount.getSpy()
    const mockedAccount = mockRegisterAccount()

    await sut.handle(mockedAccount)

    expect(spy).toBeCalledWith(mockedAccount)
  })
  test('should return server error http error if addAccount returns generic error', async () => {
    const { sut, addAccount } = makeSut()
    addAccount.mockAddAccount(error(createLevelError('generic', 'any-error')))

    const response = await sut.handle(mockRegisterAccount())

    expect(response).toEqual(HttpResponse.serverError('unexpected error'))
  })
  test('should return error 409 if addAccount returns conflict error ', async () => {
    const { sut, addAccount } = makeSut()
    const conflictError = createLevelError('conflict', 'any-error')
    addAccount.mockAddAccount(error(conflictError))

    const response = await sut.handle(mockRegisterAccount())

    expect(response).toEqual(HttpResponse.conflict(conflictError.message))
  })
  test('should call token generator with correct values', async () => {
    const { sut, generateAccessToken } = makeSut()
    const spy = generateAccessToken.getSpy()
    const mockedAccount = mockRegisterAccount()

    await sut.handle(mockedAccount)

    expect(spy).toBeCalledWith({ username: mockedAccount.username })
  })
  test('should return unexpected error if generateAccessToken throws', async () => {
    const { sut, generateAccessToken } = makeSut()
    const spy = generateAccessToken.getSpy()
    spy.mockImplementationOnce(async (_: any) => {
      throw Error
    })
    const mockedAccount = mockRegisterAccount()

    const response = await sut.handle(mockedAccount)

    expect(response).toEqual(HttpResponse.serverError('unexpected error'))
  })

  test('should return access token', async () => {
    const { sut, generateAccessToken } = makeSut()
    generateAccessToken.mockGenerateAccessToken('valid-token')
    const mockedAccount = mockRegisterAccount()

    const response = await sut.handle(mockedAccount)

    expect(response).toEqual(
      HttpResponse.authorize<Session>({
        accessToken: 'valid-token'
      })
    )
  })
})
