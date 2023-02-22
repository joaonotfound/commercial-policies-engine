import { HttpResponse } from './http-response'

export interface Controller<T = any> {
  handle(data: T): Promise<HttpResponse>
}
