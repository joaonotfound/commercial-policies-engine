import { ErrorLevel } from '@/domain'

export const createLevelError = <T extends string = string>(
  error: T,
  message: string
): ErrorLevel => ({
  error,
  message
})
