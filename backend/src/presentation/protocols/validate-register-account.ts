import { RegisterAccount } from '@/domain'

export interface ValidateRegisterAccountSchema {
  validateRegisterAccountSchema(account: unknown): account is RegisterAccount
}
