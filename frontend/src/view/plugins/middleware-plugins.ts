import { addRouteMiddleware, defineNuxtPlugin, useCookie } from 'nuxt/app'

export default defineNuxtPlugin(() => {
  const isAuthenticated = () => {
    const accessToken = useCookie('x-access-token')
    return accessToken.value !== undefined
  }

  const publicPages = ['/login', '/sign-up', '/']

  addRouteMiddleware(
    'only-authenticated',
    ({ path }) =>
      publicPages.includes(path) ||
      path.startsWith('/api/') ||
      isAuthenticated()
        ? true
        : '/login',
    { global: true }
  )
})
