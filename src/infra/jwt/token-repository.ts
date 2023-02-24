// eslint-disable-next-line import/default
import jwt from 'jsonwebtoken'
import { GenerateAccessToken } from '@/data'
import { Account } from '@/domain'
export class TokenRepository implements GenerateAccessToken {
  private readonly salt = 'super-secure-salt'
  // eslint-disable-next-line require-await
  async generateAccessToken(account: Account): Promise<string> {
    // eslint-disable-next-line import/no-named-as-default-member
    return jwt.sign({ id: account }, this.salt)
  }
}
