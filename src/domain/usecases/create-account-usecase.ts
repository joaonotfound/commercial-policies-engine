import { DomainError } from '../errors'
import { RegisterAccount, Result } from '../models'
import { PublicAccount } from '../models/public-account'

export interface AddAccountUsecase {
  addAccount(
    account: RegisterAccount
  ): Promise<Result<PublicAccount, DomainError>>
}
