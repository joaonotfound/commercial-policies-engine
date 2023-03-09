import { FindAccountsByEmail } from '@/data'
import { Account } from '@/domain'

export class MockFindAccountByEmail implements FindAccountsByEmail {
  mockFindAccountByEmailCall(response: Account | null) {
    jest
      .spyOn(this as FindAccountsByEmail, 'findAccountByEmail')
      .mockResolvedValueOnce(response)
  }

  // eslint-disable-next-line require-await
  async findAccountByEmail(_: string): Promise<Account | null> {
    return null
  }
}
