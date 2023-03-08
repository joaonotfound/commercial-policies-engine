import Cryptr from 'cryptr'
import { Decrypter, Encrypter } from '@/data'
export class CryptrEncryptRepository implements Encrypter, Decrypter {
  private readonly cryptr = new Cryptr('secret')

  // eslint-disable-next-line require-await
  async decrypt(encryptedText: string): Promise<string> {
    return this.cryptr.decrypt(encryptedText)
  }

  // eslint-disable-next-line require-await
  async encrypt(plaintext: string): Promise<string> {
    return this.cryptr.encrypt(plaintext)
    // return this.cryptr.encrypt(plaintext)
  }
}
