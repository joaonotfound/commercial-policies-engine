import { Account } from '@/domain'

export interface FindAccountsByEmail {
  findAccountByEmail(email: string): Promise<Account | null>
}
