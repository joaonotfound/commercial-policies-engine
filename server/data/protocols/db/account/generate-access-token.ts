import { Account } from '../../../../domain'

export interface GenerateAccessToken {
  generateAccessToken(account: Account): Promise<string>
}
