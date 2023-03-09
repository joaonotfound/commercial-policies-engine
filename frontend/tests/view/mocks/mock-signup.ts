import { ok } from '@/data'
import { Result, Session } from '@/domain'
import { Signup } from '@/view'

export class MockSignup implements Signup {
  mockSignupCall(response: Result<Session, string>) {
    jest.spyOn(this as Signup, 'signup').mockResolvedValueOnce(response)
  }

  // eslint-disable-next-line require-await
  async signup(_: string | null, _2: string | null, _3: string | null) {
    return ok({ accessToken: 'random-token' })
  }
}
