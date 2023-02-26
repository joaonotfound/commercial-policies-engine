import { RegisterAccount } from '@/domain'
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

  mockValidateRegisterAccountSchemaCall(response: boolean) {
    jest
      .spyOn(
        this as ValidateRegisterAccountSchema,
        'validateRegisterAccountSchema'
      )
      .mockReturnValueOnce(response)
  }
}

class SignupController implements Controller {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    private readonly validateRegisterAccountSchema: ValidateRegisterAccountSchema
  ) {}

  // eslint-disable-next-line require-await
  async handle(data: unknown | RegisterAccount): Promise<HttpResponse<any>> {
    const isValidSchema =
      this.validateRegisterAccountSchema.validateRegisterAccountSchema(data)
    if (!isValidSchema) {
      return HttpResponse.badRequest('missing params')
    }
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
  const sut = new SignupController(validateSchema)
  return {
    sut,
    validateSchema
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
})
