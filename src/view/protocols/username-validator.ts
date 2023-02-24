import { InputState } from './input-state'

export interface UsernameValidator {
  validateUsername(username: string | null): InputState | null
}
