import { InputState } from '../types'

export const useUsernameValidator = (
  value: string | null
): InputState | null => {
  if (value == null) {
    return null
  }
  return /^[a-zA-Z0-9]+([._]?[a-zA-Z0-9]+)*$/.test(value)
    ? null
    : {
        level: 'error',
        message: 'Invalid username.'
      }
}
