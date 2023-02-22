import { Controller, HttpResponse } from '../protocols'
import { AuthenticationUsecase } from '../../domain'

export class LoginController implements Controller {
  // eslint-disable-next-line no-useless-constructor
  constructor(private readonly authentication: AuthenticationUsecase) {}

  async handle(request: LoginController.Request): Promise<HttpResponse<any>> {
    if (!request.username.length || !request.password.length) {
      return HttpResponse.badRequest('Missing credentials')
    }

    const response = await this.authentication.authenticate(request)

    return response.ok
      ? HttpResponse.authorize(response.value)
      : HttpResponse.unauthorize(response.error)
  }
}

export namespace LoginController {
  export type Request = {
    username: string
    password: string
  }
}
