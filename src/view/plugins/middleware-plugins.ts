import {
  addRouteMiddleware,
  defineNuxtRouteMiddleware,
  useCookie
} from 'nuxt/app'

const isAuthenticated = () => {
  const accessToken = useCookie('x-access-token')
  return accessToken.value !== undefined
}

export default defineNuxtRouteMiddleware(() => {
  addRouteMiddleware(
    'only-authenticated',
    ({ path }) =>
      path === '/login' || path.startsWith('/api/') || isAuthenticated()
        ? true
        : '/login',
    { global: true }
  )
})
