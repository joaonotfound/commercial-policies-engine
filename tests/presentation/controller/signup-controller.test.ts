import { error, GenerateAccessToken, ok } from '@/data'
import {
  AddAccountUsecase,
  PublicAccount,
  RegisterAccount,
  Result,
  Session
} from '@/domain'
import { Controller, HttpResponse } from '@/presentation'
import { mockRegisterAccount } from '@/tests/domain'
import { MockGenerateAccessToken } from '@/tests/data'

interface ValidateRegisterAccountSchema {
  validateRegisterAccountSchema(account: unknown): account is RegisterAccount
}

class MockValidateRegisterAccountSchema
  implements ValidateRegisterAccountSchema
{
  validateRegisterAccountSchema(_: unknown): _ is RegisterAccount {
    return true
  }

  getSpy() {
    return jest.spyOn(
      this as ValidateRegisterAccountSchema,
      'validateRegisterAccountSchema'
    )
  }

  mockValidateRegisterAccountSchemaCall(response: boolean) {
    this.getSpy().mockReturnValueOnce(response)
  }
}

class MockAddAccount implements AddAccountUsecase {
  mockAddAccount(response: Result<PublicAccount, string>) {
    this.getSpy().mockResolvedValueOnce(response)
  }

  getSpy() {
    return jest.spyOn(this as AddAccountUsecase, 'addAccount')
  }

  // eslint-disable-next-line require-await
  async addAccount(
    data: RegisterAccount
  ): Promise<Result<PublicAccount, string>> {
    return ok({
      username: data.username
    })
  }
}
class SignupController implements Controller {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    private readonly validateRegisterAccountSchema: ValidateRegisterAccountSchema,
    private readonly addAccount: AddAccountUsecase,
    private readonly tokenGenerator: GenerateAccessToken
  ) {}

  async handle(
    data: unknown | RegisterAccount
  ): Promise<HttpResponse<Session, string>> {
    const isValidSchema =
      this.validateRegisterAccountSchema.validateRegisterAccountSchema(data)
    if (!isValidSchema) {
      return HttpResponse.badRequest('missing params')
    }
    const added = await this.addAccount.addAccount(data)
    if (!added.ok) {
      return HttpResponse.serverError('unexpected error')
    }
    const accessToken = await this.tokenGenerator.generateAccessToken(
      added.value
    )
    return HttpResponse.authorize({
      accessToken
    })
  }
}

/*
    success case:
        -   validate the schema
        -   add account on database
        -   return session

*/

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
