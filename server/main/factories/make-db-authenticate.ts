import { DbAuthentication } from '../../data'
import { makeMd5Hasher } from './make-md5-hasher'
import { makeJwtTokenRepository } from './make-jwt-token-repository'
import { makeMongooseAccountRepository } from './make-mongoose-account-repository'

export const makeDbAuthenticate = () => {
  return new DbAuthentication(
    makeMongooseAccountRepository(),
    makeMd5Hasher(),
    makeJwtTokenRepository()
  )
}
