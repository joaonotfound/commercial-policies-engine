import { RegisterAccount } from '@/domain'

export interface AddAccountRepository {
  addAccount(account: RegisterAccount): Promise<boolean>
}
