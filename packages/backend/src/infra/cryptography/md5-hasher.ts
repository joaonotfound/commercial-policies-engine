import md5 from 'md5'
import { HashComparer, Hasher } from '@/data'

export class Md5Hasher implements Hasher, HashComparer {
  // eslint-disable-next-line require-await
  async generateHash(value: string): Promise<string> {
    return md5(value)
  }

  // eslint-disable-next-line require-await
  async compareHash(plainText: string, digest: string): Promise<boolean> {
    return md5(plainText) === digest
  }
}
