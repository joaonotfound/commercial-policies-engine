import { computed, ref } from 'vue'

import {
  EmailValidator,
  HomeRouter,
  PasswordValidator,
  SaveSession,
  Signup,
  UsernameValidator
} from '../protocols'

const createRef = (
  emailValidator: EmailValidator,
  usernameValidator: UsernameValidator,
  passwordValidator: PasswordValidator
) => {
  const email = ref<string | null>(null)
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

  const emailState = computed(() => emailValidator.validateEmail(email.value))
  const usernameState = computed(() =>
    usernameValidator.validateUsername(username.value)
  )
  const passwordState = computed(() =>
    passwordValidator.validatePassword(password.value)
  )
  const validForm = computed(
    () =>
      username.value != null &&
      email.value != null &&
      password.value != null &&
      (passwordState.value == null ||
        passwordState.value.level === 'success') &&
      (emailState.value == null || passwordState.value?.level === 'success') &&
      usernameState.value == null
  )
  return {
    email,
    username,
    password,
    mainError,
    setMainError,
    clearCredentialsError,
    isLoading,
    emailState,
    passwordState,
    usernameState,
    validForm
  }
}

export const useSignupPresenter = (
  emailValidator: EmailValidator,
  usernameValidator: UsernameValidator,
  passwordValidator: PasswordValidator,
  homeRouter: HomeRouter,
  createAccount: Signup,
  saveSession: SaveSession
) => {
  const {
    email,
    username,
    password,
    mainError,
    setMainError,
    clearCredentialsError,
    isLoading,
    emailState,
    passwordState,
    usernameState,
    validForm
  } = createRef(emailValidator, usernameValidator, passwordValidator)

  const signup = async () => {
    try {
      const response = await createAccount.signup(
        email.value,
        username.value,
        password.value
      )
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
    email,
    username,
    password,
    emailState,
    usernameState,
    passwordState,
    mainError,
    clearCredentialsError,
    validForm,
    isLoading,
    signup
  }
}

export type SignupPresenter = ReturnType<typeof useSignupPresenter>
