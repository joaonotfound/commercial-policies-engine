import { CryptrEncryptRepository } from '@/infra'

export const makeCryptRepository = () => {
  return new CryptrEncryptRepository()
}
