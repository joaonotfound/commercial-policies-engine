import { FindAccountByUsername } from '@/server/data'
import { Account } from '@/server/domain'

export class MockFindAccountByUsername implements FindAccountByUsername {
  private _response: Account[] = []
  mockFindAccountByUsername(data: Account[]) {
    this._response = data
  }

  // eslint-disable-next-line require-await
  async findAccountByUsername(_: string): Promise<Account[]> {
    return this._response
  }
}
