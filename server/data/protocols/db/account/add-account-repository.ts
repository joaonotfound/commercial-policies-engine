import { Account } from '../../../../domain'

export interface AddAccountRepository {
  addAccount(
    account: AddAccountRepository.Params
  ): Promise<AddAccountRepository.Result>
}

export namespace AddAccountRepository {
  export type Result = boolean
  export type Params = Account
}
