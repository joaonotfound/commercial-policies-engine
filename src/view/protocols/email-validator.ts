import { InputState } from './input-state'

export interface EmailValidator {
  validateEmail(email: string | null): InputState | null
}
