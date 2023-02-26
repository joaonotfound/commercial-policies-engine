import { MockValidateRegisterAccountSchema } from '../mocks'
import { error } from '@/data'
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
    const spy = jest.spyOn(validateSchema, 'validateRegisterAccountSchema')
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
  test('should return server error http error if addAccount fails ', async () => {
    const { sut, addAccount } = makeSut()
    addAccount.mockAddAccount(error('any-error'))

    const response = await sut.handle(mockRegisterAccount())

    expect(response).toEqual(HttpResponse.serverError('unexpected error'))
  })
  test('should call token generator with correct values', async () => {
    const { sut, generateAccessToken } = makeSut()
    const spy = generateAccessToken.getSpy()
    const mockedAccount = mockRegisterAccount()

    await sut.handle(mockedAccount)

    expect(spy).toBeCalledWith({ username: mockedAccount.username })
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
