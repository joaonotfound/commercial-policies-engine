import { Session } from '@/domain'

export interface SaveSession {
  saveSession(session: Session): Promise<void>
}
