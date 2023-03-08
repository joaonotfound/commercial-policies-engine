import { Result, Session } from '@/domain'

export interface Signup {
  signup(
    email: string | null,
    username: string | null,
    password: string | null
  ): Promise<Result<Session, string>>
}
