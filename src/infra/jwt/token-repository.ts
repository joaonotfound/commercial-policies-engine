import * as jwt from 'jsonwebtoken'
import { GenerateAccessToken } from '@/data'
import { Account } from '@/domain'

export class TokenRepository implements GenerateAccessToken {
  private readonly salt = 'super-secure-salt'
  // eslint-disable-next-line require-await
  async generateAccessToken(account: Account): Promise<string> {
    return jwt.sign({ id: account }, this.salt)
  }
}
