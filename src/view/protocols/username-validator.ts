import { InputState } from '../composables'

export interface UsernameValidator {
  validateUsername(username: string | null): InputState | null
}
