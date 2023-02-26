import { H3Event, readBody, createError } from 'h3'
import { Controller } from '@/presentation'

export const adaptHttp = (controller: Controller) => async (event: H3Event) => {
  const body = await readBody(event)
  const response = await controller.handle(body)
  return response.status === 200
    ? response.body
    : createError({ statusCode: response.status, statusMessage: response.body })
}
