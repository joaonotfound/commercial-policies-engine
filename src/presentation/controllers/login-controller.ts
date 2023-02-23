import { Controller, HttpResponse } from '../protocols'
import { AuthenticationUsecase } from '@/domain'

export class LoginController implements Controller {
  // eslint-disable-next-line no-useless-constructor
  constructor(private readonly authentication: AuthenticationUsecase) {}

  async handle(request: LoginController.Request): Promise<HttpResponse<any>> {
    const validSchema = this.isValidSchema(request)
    if (!validSchema) return HttpResponse.badRequest('Missing credentials')

    const response = await this.authentication.authenticate(request)

    return response.ok
      ? HttpResponse.authorize(response.value)
      : HttpResponse.unauthorize(response.error)
  }

  isValidSchema(request: LoginController.Request): boolean {
    if (!request.username || !request.password) {
      return false
    }

    if (!request.username.length || !request.password.length) {
      return false
    }
    return true
  }
}

export namespace LoginController {
  export type Request = {
    username: string
    password: string
  }
}
