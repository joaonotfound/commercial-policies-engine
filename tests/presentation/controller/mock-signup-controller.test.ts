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
}

class SignupController implements Controller {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    private readonly validateRegisterAccountSchema: ValidateRegisterAccountSchema
  ) {}

  // eslint-disable-next-line require-await
  async handle(data: unknown | RegisterAccount): Promise<HttpResponse<any>> {
    this.validateRegisterAccountSchema.validateRegisterAccountSchema(data)
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
})
