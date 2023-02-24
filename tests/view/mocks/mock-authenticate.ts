import { ok } from '@/data'
import { Result, Session } from '@/domain'
import { Authenticate } from '@/view'

export class MockAuthenticate implements Authenticate {
  mockAuthenticateCall(response: Result<Session, string>): void {
    jest
      .spyOn(this as Authenticate, 'authenticate')
      .mockResolvedValueOnce(response)
  }

  // eslint-disable-next-line require-await
  async authenticate(
    _: string | null,
    _2: string | null
  ): Promise<Result<Session, string>> {
    return ok({
      accessToken: 'random-access-token'
    })
  }
}
