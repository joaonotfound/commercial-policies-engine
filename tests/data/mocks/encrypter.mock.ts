import { Encrypter } from '~~/server/data'

export class MockEncrypter implements Encrypter {
  mockEncrypt(response: string) {
    jest.spyOn(this as Encrypter, 'encrypt').mockResolvedValueOnce(response)
  }

  // eslint-disable-next-line require-await
  async encrypt(plaintext: string): Promise<string> {
    return plaintext
  }
}
