import { computed, ref, watch } from 'vue'
import { useLazyFetch, useRouter, useCookie } from 'nuxt/app'
import {
  usePasswordValidator,
  useUsernameValidator
} from '@/view/composables/validators'

const validateResponse = (
  response: any
): response is {
  accessToken: string
} => response.accessToken !== undefined

const createRef = () => {
  const username = ref<string | null>(null)
  const password = ref<string | null>(null)

  const mainError = ref<string | null>(null)
  const setError = (value: string | null) => {
    mainError.value = value
  }
  const clearCredentialsError = () => {
    mainError.value = null
  }
  const isLoading = ref<boolean>(false)

  const passwordState = computed(() => usePasswordValidator(password.value))
  const usernameState = computed(() => useUsernameValidator(username.value))
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
    setError,
    clearCredentialsError,
    isLoading,
    passwordState,
    usernameState,
    validForm
  }
}

const makeRequest = (username: string | null, password: string | null) => {
  return useLazyFetch('/api/logon', {
    method: 'post',
    params: {
      username,
      password
    }
  })
}
const redirectToHome = () => {
  const router = useRouter()
  router.replace('/home')
}

const setCookie = (accessToken: string) => {
  const cookie = useCookie('x-access-token')
  cookie.value = accessToken
}

export const useLoginscreenComposable = () => {
  const {
    username,
    password,
    mainError,
    setError,
    clearCredentialsError,
    isLoading,
    passwordState,
    usernameState,
    validForm
  } = createRef()
  // eslint-disable-next-line require-await
  const login = async () => {
    isLoading.value = true
    const { error, data } = makeRequest(username.value, password.value)
    watch(error, (_) => {
      setError('Could not find your account')
      isLoading.value = false
    })
    watch(data, (response) => {
      isLoading.value = false
      if (!validateResponse(response)) {
        return setError('Houve um error! Tente novamente mais tarde')
      }
      setCookie(response.accessToken)
      redirectToHome()
    })
  }
  return {
    username,
    password,
    usernameState,
    passwordState,
    credentialsError: mainError,
    clearCredentialsError,
    validForm,
    isLoading,
    login
  }
}
