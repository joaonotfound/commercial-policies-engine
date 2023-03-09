import { GenerateAccessToken } from '@/data'
import { Account } from '@/domain'

export class MockGenerateAccessToken implements GenerateAccessToken {
  getSpy() {
    return jest.spyOn(this as GenerateAccessToken, 'generateAccessToken')
  }

  mockGenerateAccessToken(data: string) {
    this.getSpy().mockResolvedValueOnce(data)
  }

  // eslint-disable-next-line require-await
  async generateAccessToken(_: Account): Promise<string> {
    return ''
  }
}
