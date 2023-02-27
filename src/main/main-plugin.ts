import { defineNuxtPlugin } from 'nuxt/app'
import { makeSignupPresenteer } from './factories'
import { makeLoginPresenter } from './factories/presenters/make-login-presenter'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide('loginPresenter', makeLoginPresenter())
  nuxtApp.provide('signupPresenter', makeSignupPresenteer())
})
