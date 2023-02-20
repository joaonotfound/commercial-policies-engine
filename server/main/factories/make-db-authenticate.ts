import { DbAuthenticate } from '../../data'
import { makeMd5Hasher } from './make-md5-hasher'
import { makeJwtTokenRepository } from './make-jwt-token-repository'
import { makeMongooseAccountRepository } from './make-mongoose-account-repository'

export const makeDbAuthenticate = () => {
  return new DbAuthenticate(
    makeMongooseAccountRepository(),
    makeMd5Hasher(),
    makeJwtTokenRepository()
  )
}
