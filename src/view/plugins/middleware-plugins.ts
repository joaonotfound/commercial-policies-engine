import {
  addRouteMiddleware,
  defineNuxtRouteMiddleware,
  useCookie
} from 'nuxt/app'

const isAuthenticated = () => {
  const accessToken = useCookie('x-access-token')
  return accessToken.value !== undefined
}

const publicPages = ['/login', '/sign-up']

export default defineNuxtRouteMiddleware(() => {
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
