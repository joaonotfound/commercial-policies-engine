import { Session } from '@/domain'
import { SaveSession } from '@/view'

export class MockSaveSession implements SaveSession {
  async saveSession(_: Session): Promise<void> {}
}
