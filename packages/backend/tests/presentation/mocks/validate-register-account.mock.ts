import { RegisterAccount } from '@/domain'
import { ValidateRegisterAccountSchema } from '@/presentation'

export class MockValidateRegisterAccountSchema
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
