import { watch } from 'vue'
import { useLazyFetch } from 'nuxt/app'
import { error, ok } from '@/data'
import { Result } from '@/domain'

type HttpResponse = {
  statusCode: number | undefined
  body: any
}

export const adaptLazyFetchToResult = (
  ...args: Parameters<typeof useLazyFetch>
) => {
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
