import { InputState } from '../../view/composables/types'
import { UsernameValidator } from '@/view/protocols'

const invalidUsernameState: InputState = {
  level: 'error',
  message: 'Invalid username.'
}

export class RegxUsernameValidator implements UsernameValidator {
  validateUsername(username: string | null): InputState | null {
    return username == null ||
      /^[a-zA-Z0-9]+([._]?[a-zA-Z0-9]+)*$/.test(username)
      ? null
      : invalidUsernameState
  }
}
