import { AddAccountRepository } from '@/data'
import { RegisterAccount } from '@/domain'

export class MockAddAccountRepository implements AddAccountRepository {
  mockAddAccountError(error: string) {
    jest
      .spyOn(this as AddAccountRepository, 'addAccount')
      // eslint-disable-next-line require-await
      .mockImplementationOnce(async () => {
        throw error
      })
  }

  mockAddAccountCall(response: boolean) {
    jest
      .spyOn(this as AddAccountRepository, 'addAccount')
      .mockResolvedValueOnce(response)
  }

  // eslint-disable-next-line require-await
  async addAccount(_: RegisterAccount): Promise<boolean> {
    return true
  }
}
