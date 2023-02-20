import { TokenRepository } from '../../infra'

export const makeJwtTokenRepository = () => {
  return new TokenRepository()
}
