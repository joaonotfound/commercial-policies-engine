import { useRuntimeConfig } from 'nuxt/app'
import { adaptLazyFetchToResult } from './result-adapt-lazyfetch'
import { error, ok } from '@/data'
import { Result, Session } from '@/domain'
import { Signup } from '@/view'

const extractConflictError = (error: string) => {
  return error.includes('username')
    ? 'username already in use'
    : 'email already in use'
}
export class NuxtCreateAccount implements Signup {
  async signup(
    email: string | null,
    username: string | null,
    password: string | null
  ): Promise<Result<Session, string>> {
    const config = useRuntimeConfig()
    console.log('config: ', config)
    const response = await adaptLazyFetchToResult(
      `${config.BACKEND_URL}/api/signup`,
      {
        method: 'post',
        body: {
          email,
          username,
          password
        }
      }
    )

    return response.ok
      ? ok(response.value)
      : response.error.statusCode === 409
      ? error(extractConflictError(response.error.body))
      : error('Ops! Server error! Try again later...')
  }
}
