export const error = <T>(error: T): { ok: false; error: T } => ({
  ok: false,
  error
})
