import { Account } from '../../../../domain'

export interface FindAccountByUsername {
  findAccountByUsername(username: string): Promise<Account[]>
}
