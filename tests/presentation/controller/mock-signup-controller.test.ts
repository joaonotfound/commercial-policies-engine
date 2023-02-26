import { faker } from '@faker-js/faker'
import { ok } from '@/data'
import {
  AddAccountUsecase,
  PublicAccount,
  RegisterAccount,
  Result
} from '@/domain'
import { Controller, HttpResponse } from '@/presentation'
import { mockRegisterAccount } from '@/tests/domain'

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

const mockPublicAccount = (): PublicAccount => {
  return {
    username: faker.internet.userName()
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
  async addAccount(_: RegisterAccount): Promise<Result<PublicAccount, string>> {
    return ok(mockPublicAccount())
  }
}
class SignupController implements Controller {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    private readonly validateRegisterAccountSchema: ValidateRegisterAccountSchema,
    private readonly addAccount: AddAccountUsecase
  ) {}

   
  async handle(data: unknown | RegisterAccount): Promise<HttpResponse<any>> {
    const isValidSchema =
      this.validateRegisterAccountSchema.validateRegisterAccountSchema(data)
    if (!isValidSchema) {
      return HttpResponse.badRequest('missing params')
    }
    await this.addAccount.addAccount(data)
    return HttpResponse.authorize('')
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
  const sut = new SignupController(validateSchema, addAccount)
  return {
    sut,
    validateSchema,
    addAccount
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
})
