import { InputState } from './input-state'

export interface PasswordValidator {
  validatePassword(password: string | null): InputState | null
}
