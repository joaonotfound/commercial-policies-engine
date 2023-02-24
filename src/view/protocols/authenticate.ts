import { Result, Session } from '@/domain'

export interface Authenticate {
  authenticate(
    username: string | null,
    password: string | null
  ): Promise<Result<Session, string>>
}
