import { Md5Hasher } from '../../infra'

export const makeMd5Hasher = () => {
  return new Md5Hasher()
}
