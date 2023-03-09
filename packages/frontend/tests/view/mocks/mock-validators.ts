import {
  EmailValidator,
  InputState,
  PasswordValidator,
  UsernameValidator
} from '@/view'

export class MockValidator
  implements UsernameValidator, PasswordValidator, EmailValidator
{
  mockValidateEmailCall(response: InputState | null): void {
    jest
      .spyOn(this as EmailValidator, 'validateEmail')
      .mockReturnValueOnce(response)
  }

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

  validateEmail(_: string | null) {
    return null
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
