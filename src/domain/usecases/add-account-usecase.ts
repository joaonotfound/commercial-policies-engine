import { ErrorLevel, RegisterAccount, Result } from '../models'
import { PublicAccount } from '../models/public-account'

export interface AddAccountUsecase {
  addAccount(
    account: RegisterAccount
  ): Promise<Result<PublicAccount, ErrorLevel>>
}
