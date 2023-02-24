import { defineNuxtPlugin } from 'nuxt/app'
import { makeLoginPresenter } from './factories/presenters/make-login-presenter'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide('loginPresenter', makeLoginPresenter())
})