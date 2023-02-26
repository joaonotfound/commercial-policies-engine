import {
  HttpController,
  HttpResponse,
  ValidateRegisterAccountSchema
} from '../protocols'
import { GenerateAccessToken } from '@/data'
import { AddAccountUsecase, Session } from '@/domain'

export class SignupController implements HttpController<Session, string> {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    private readonly validateRegisterAccountSchema: ValidateRegisterAccountSchema,
    private readonly addAccount: AddAccountUsecase,
    private readonly tokenGenerator: GenerateAccessToken
  ) {}

  async handle(data: unknown) {
    try {
      const isValidSchema =
        this.validateRegisterAccountSchema.validateRegisterAccountSchema(data)
      if (!isValidSchema) {
        return HttpResponse.badRequest('missing params')
      }
      const added = await this.addAccount.addAccount(data)
      if (!added.ok) {
        return HttpResponse.serverError('unexpected error')
      }
      const accessToken = await this.tokenGenerator.generateAccessToken(
        added.value
      )
      return HttpResponse.authorize({
        accessToken
      })
    } catch {
      return HttpResponse.serverError('unexpected error')
    }
  }
}
