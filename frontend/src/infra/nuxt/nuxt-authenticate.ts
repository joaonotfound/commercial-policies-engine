import { adaptLazyFetchToResult } from './result-adapt-lazyfetch'
import { error, ok } from '@/data'
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
      ? ok(response.value)
      : response.error.statusCode === 401
      ? error('Incorrect username or password.')
      : error('Ops! Server error! Try again later...')
  }
}
