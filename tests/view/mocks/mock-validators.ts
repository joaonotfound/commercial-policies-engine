import { InputState, PasswordValidator, UsernameValidator } from '@/view'

export class MockValidator implements UsernameValidator, PasswordValidator {
  mockValidateUsernameCall(response: InputState | null): void {
    jest
      .spyOn(this as UsernameValidator, 'validateUsername')
      .mockReturnValueOnce(response)
  }

  mockValidatePasswordCall(response: InputState | null): void {
    jest
      .spyOn(this as PasswordValidator, 'validatePassword')
      .mockReturnValueOnce(response)
  }

  validateUsername(_: string | null) {
    return null
  }

  validatePassword(_: string | null): InputState | null {
    return {
      level: 'success',
      message: 'Valid password'
    }
  }
}
