import { error } from '@/data'
import { Result, Session } from '@/domain'
import { Signup } from '@/view'
import { adaptLazyFetchToResult } from '@/main'

export class NuxtCreateAccount implements Signup {
  async signup(
    email: string | null,
    username: string | null,
    password: string | null
  ): Promise<Result<Session, string>> {
    const response = await adaptLazyFetchToResult('/api/signup', {
      method: 'post',
      body: {
        email,
        username,
        password
      }
    })

    return response.ok
      ? response.value
      : response.error.statusCode === 401
      ? error(
          'We could not find your account. Check your username and password again.'
        )
      : response.error.statusCode === 409
      ? error(response.error.body.message)
      : error('Ops! Server error! Try again later...')
  }
}
