import { adaptLazyFetchToResult } from './result-adapt-lazyfetch'
import { error } from '@/data'
import { Result, Session } from '@/domain'
import { Authenticate } from '@/view'
export class NuxtAuthenticate implements Authenticate {
  async authenticate(
    username: string | null,
    password: string | null
  ): Promise<Result<Session, string>> {
    const response = await adaptLazyFetchToResult('/api/logon', {
      method: 'post',
      body: {
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
      : error('Ops! Server error! Try again later...')
  }
}
