import {
  AddAccountUsecase,
  PublicAccount,
  RegisterAccount,
  Result
} from '@/domain'
import { ok } from '@/data'

export class MockAddAccount implements AddAccountUsecase {
  mockAddAccount(response: Result<PublicAccount, string>) {
    this.getSpy().mockResolvedValueOnce(response)
  }

  getSpy() {
    return jest.spyOn(this as AddAccountUsecase, 'addAccount')
  }

  // eslint-disable-next-line require-await
  async addAccount(
    data: RegisterAccount
  ): Promise<Result<PublicAccount, string>> {
    return ok({
      username: data.username
    })
  }
}
