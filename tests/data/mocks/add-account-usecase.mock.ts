import {
  AddAccountUsecase,
  ErrorLevel,
  PublicAccount,
  RegisterAccount,
  Result
} from '@/domain'
import { ok } from '@/data'

export class MockAddAccount implements AddAccountUsecase {
  mockAddAccount(response: Result<PublicAccount, ErrorLevel>) {
    this.getSpy().mockResolvedValueOnce(response)
  }

  getSpy() {
    return jest.spyOn(this as AddAccountUsecase, 'addAccount')
  }

  // eslint-disable-next-line require-await
  async addAccount(data: RegisterAccount) {
    return ok({
      username: data.username
    })
  }
}
