import { useCookie } from 'nuxt/app'
import { Session } from '@/domain'
import { SaveSession } from '@/view/protocols'

export class CookieSessionManager implements SaveSession {
  // eslint-disable-next-line require-await
  async saveSession(session: Session): Promise<void> {
    const cookie = useCookie('x-access-token')
    cookie.value = session.accessToken
  }
}
