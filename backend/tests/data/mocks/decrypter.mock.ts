// import jest from 'jest'
import { Decrypter } from '@/data'

export class DecrypterMock implements Decrypter {
  mockDecrypter(value: string) {
    jest.spyOn(this as Decrypter, 'decrypt').mockResolvedValueOnce(value)
  }

  // eslint-disable-next-line require-await
  async decrypt(encryptedText: string): Promise<string> {
    return encryptedText
  }
}
