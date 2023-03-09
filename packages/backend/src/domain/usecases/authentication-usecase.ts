import { DomainError, Account, Session, Result } from '@/domain'

export interface AuthenticationUsecase {
  authenticate(account: Account): Promise<Result<Session, DomainError>>
}
