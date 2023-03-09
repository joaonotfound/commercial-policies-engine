import { DatabaseAddAccount } from "@/data"
import { Md5Hasher, MongooseAccountRepository } from "@/infra"

export const makeDatabaseAddAccount = () => {
    const accountRepository = new MongooseAccountRepository()
    const hasher = new Md5Hasher()
    return new DatabaseAddAccount(accountRepository, accountRepository, accountRepository, hasher)
}