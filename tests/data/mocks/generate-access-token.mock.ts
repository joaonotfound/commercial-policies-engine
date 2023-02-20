import { GenerateAccessToken } from '~~/server/data'
import { Account } from '~~/server/domain'

export class MockGenerateAccessToken implements GenerateAccessToken {
  mockGenerateAccessToken(data: string) {
    jest
      .spyOn(this as GenerateAccessToken, 'generateAccessToken')
      .mockResolvedValueOnce(data)
  }

  // eslint-disable-next-line require-await
  async generateAccessToken(_: Account): Promise<string> {
    return ''
  }
}