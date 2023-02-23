import { InputState } from '../types'

const minLength = (value: string, length: number) => value.length >= length

export const usePasswordValidator = (
  value: string | null
): InputState | null => {
  if (value == null) {
    return null
  }

  if (!minLength(value, 6)) {
    return {
      level: 'error',
      message: 'Your password must contain at least 6 caracteres'
    }
  }
  return {
    level: 'success',
    message: 'Valid password'
  }
}
