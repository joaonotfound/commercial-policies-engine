import { DomainError } from '../errors'
import { Account, Session, Result } from '../models'

export interface AuthenticateUsecase {
  authenticate(account: Account): Promise<Result<Session, DomainError>>
}
