export type HttpResponse<T = any> = {
  status: number
  body: T
}

const createResponseHelper =
  (status: number) =>
  <T>(body: T): HttpResponse<T> => ({
    status,
    body
  })

export namespace HttpResponse {
  export const authorize = createResponseHelper(200)
  export const unauthorize = createResponseHelper(401)
  export const badRequest = createResponseHelper(400)
  export const serverError = createResponseHelper(500)
}
