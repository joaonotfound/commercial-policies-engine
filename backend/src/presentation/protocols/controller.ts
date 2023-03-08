import { HttpResponse } from './http-response'

export interface Controller<P = any, R = any, E = any> {
  handle(data: P): Promise<HttpResponse<R, E>>
}

export interface HttpController<R = any, E = any>
  extends Controller<unknown, R, E> {
  handle(data: unknown): Promise<HttpResponse<R, E>>
}
