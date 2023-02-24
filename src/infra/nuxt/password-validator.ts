import { InputState } from '../../view/composables/types'
import { PasswordValidator } from '@/view/protocols'

const minLength = (value: string, length: number) => value.length >= length

const minLengthError: InputState = {
  level: 'error',
  message: 'Your password must contain at least 6 caracteres'
}

const validPassword: InputState = {
  level: 'success',
  message: 'Valid password'
}

export class RegxPasswordValidator implements PasswordValidator {
  validatePassword(password: string | null): InputState | null {
    return password == null
      ? null
      : !minLength(password, 6)
      ? minLengthError
      : validPassword
  }
}
