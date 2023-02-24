import { useLazyFetch } from 'nuxt/app'
import { watch } from 'vue'
import { error, ok } from '@/data'
import { Result, Session } from '@/domain'
import { Authenticate } from '@/view'

type HttpResponse = {
  statusCode: number | undefined
  body: any
}

const adaptLazyFetchToResult = (...args: Parameters<typeof useLazyFetch>) => {
  return new Promise<Result<any, HttpResponse>>((resolve) => {
    const { data, error: errorResponse } = useLazyFetch(...args)
    watch(data, (_) => resolve(ok(data.value)))
    watch(errorResponse, (_) =>
      resolve(
        error({
          statusCode: errorResponse.value?.statusCode,
          body: errorResponse.value?.message
        })
      )
    )
  })
}

export class NuxtAuthenticate implements Authenticate {
  async authenticate(
    username: string | null,
    password: string | null
  ): Promise<Result<Session, string>> {
    const response = await adaptLazyFetchToResult('/api/logon', {
      method: 'post',
      params: {
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
