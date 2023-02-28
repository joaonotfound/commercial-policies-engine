import { computed, ref } from 'vue'

import {
  Authenticate,
  HomeRouter,
  PasswordValidator,
  SaveSession,
  UsernameValidator
} from '../protocols'

const createRef = (
  usernameValidator: UsernameValidator,
  passwordValidator: PasswordValidator
) => {
  const username = ref<string | null>(null)
  const password = ref<string | null>(null)

  const mainError = ref<string | null>(null)
  const setMainError = (value: string | null) => {
    mainError.value = value
  }
  const clearCredentialsError = () => {
    mainError.value = null
  }
  const isLoading = ref<boolean>(false)

  const usernameState = computed(() =>
    usernameValidator.validateUsername(username.value)
  )
  const passwordState = computed(() =>
    passwordValidator.validatePassword(password.value)
  )
  const validForm = computed(
    () =>
      username.value != null &&
      password.value != null &&
      (passwordState.value == null ||
        passwordState.value.level === 'success') &&
      usernameState.value == null
  )
  return {
    username,
    password,
    mainError,
    setMainError,
    clearCredentialsError,
    isLoading,
    passwordState,
    usernameState,
    validForm
  }
}

export const useLoginPresenter = (
  usernameValidator: UsernameValidator,
  passwordValidator: PasswordValidator,
  homeRouter: HomeRouter,
  auth: Authenticate,
  saveSession: SaveSession
) => {
  const {
    username,
    password,
    mainError,
    setMainError,
    clearCredentialsError,
    isLoading,
    passwordState,
    usernameState,
    validForm
  } = createRef(usernameValidator, passwordValidator)

  const login = async () => {
    try {
      const response = await auth.authenticate(username.value, password.value)
      console.log(response)
      if (response.ok) {
        await saveSession.saveSession(response.value)
        return homeRouter.redirectToHome()
      }
      return setMainError(response.error)
    } catch {
      return setMainError('unexpected error')
    }
  }

  return {
    username,
    password,
    usernameState,
    passwordState,
    mainError,
    clearCredentialsError,
    validForm,
    isLoading,
    login
  }
}

export type LoginPresenter = ReturnType<typeof useLoginPresenter>
