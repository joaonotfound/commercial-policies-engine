import Joi from 'joi'
import { EmailValidator, InputState } from '@/view'

const emailSchema = Joi.object({
  email: Joi.string().email().required()
})

const requiredError: InputState = {
  level: 'error',
  message: 'Email is required'
}

export class JoiValidatorEmail implements EmailValidator {
  validateEmail(email: string | null): InputState | null {
    if (email == null) return requiredError
    const isValid = emailSchema.validate({ email })
    if (!isValid) {
      return { level: 'error', message: 'invalid email' }
    }
    return null
  }
}
