import { JoiRegisterAccountSchema } from './joi-schemas'
import { RegisterAccount } from '@/domain'
import { ValidateRegisterAccountSchema } from '@/presentation'

export class JoiValidateSchema implements ValidateRegisterAccountSchema {
  validateRegisterAccountSchema(account: unknown): account is RegisterAccount {
    const response = JoiRegisterAccountSchema.validate(account)
    console.log(response, account)
    return response.error === undefined && response.value !== undefined
  }
}
