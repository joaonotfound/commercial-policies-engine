import { InputState } from '../composables'

export interface PasswordValidator {
  validatePassword(password: string | null): InputState | null
}
