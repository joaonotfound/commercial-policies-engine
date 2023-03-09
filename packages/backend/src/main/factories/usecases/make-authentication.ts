import { DbAuthentication } from "@/data"
import { Md5Hasher, MongooseAccountRepository, TokenRepository } from "@/infra"

export const makeAuthentication = () => {
    const accountRepository = new MongooseAccountRepository()
    const hasher = new Md5Hasher()
    const tokenRepository = new TokenRepository()
    return new DbAuthentication(accountRepository, hasher, tokenRepository)
}