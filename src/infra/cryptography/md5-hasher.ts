import md5 from 'md5'
import { Hasher } from '@/data'

export class Md5Hasher implements Hasher {
  // eslint-disable-next-line require-await
  async generateHash(value: string): Promise<string> {
    return md5(value)
  }
}
