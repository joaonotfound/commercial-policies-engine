export type HttpResponse<T = any, E = any> =
  | {
      status: 200
      body: T
    }
  | {
      status: 401 | 400 | 500
      body: E
    }

const createResponseHelper =
  <N>(status: N) =>
  <T>(body: T): { status: N; body: T } => ({
    status,
    body
  })

export namespace HttpResponse {
  export const authorize = createResponseHelper<200>(200)
  export const unauthorize = createResponseHelper<401>(401)
  export const badRequest = createResponseHelper<400>(400)
  export const serverError = createResponseHelper<500>(500)
}
