import { ok } from '@/data'
import {
  Result,
  AuthenticationUsecase,
  DomainError,
  Session,
  Account
} from '@/domain'

export class MockAuthenticationUsecase implements AuthenticationUsecase {
  mockAuthenticateCall(response: Result<Session, DomainError>) {
    this.getSpy().mockResolvedValueOnce(response)
  }

  getSpy() {
    return jest.spyOn(this as AuthenticationUsecase, 'authenticate')
  }

  // eslint-disable-next-line require-await
  async authenticate(_: Account): Promise<Result<Session, DomainError>> {
    return ok({ accessToken: 'valid-access-token' })
  }
}
