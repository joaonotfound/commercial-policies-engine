import { Hasher } from '@/server/data'

export class MockHasher implements Hasher {
  mockGenerateHash(value: string) {
    jest.spyOn(this as Hasher, 'generateHash').mockResolvedValueOnce(value)
  }

  // eslint-disable-next-line require-await
  async generateHash(_: string): Promise<string> {
    return ''
  }
}
