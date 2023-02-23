import { computed, ref, watch } from 'vue'
import { useLazyFetch } from 'nuxt/app'
import {
  usePasswordValidator,
  useUsernameValidator
} from '@/view/composables/validators'

export const useLoginscreenComposable = () => {
  const username = ref<string | null>(null)
  const password = ref<string | null>(null)

  const credentialsError = ref<string | null>(null)
  const clearCredentialsError = () => {
    credentialsError.value = null
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
  // eslint-disable-next-line require-await
  const login = async () => {
    isLoading.value = true
    const { error, data } = useLazyFetch('/api/logon', {
      method: 'post',
      params: {
        username: username.value,
        password: password.value
      }
    })
    watch(error, (_) => {
      credentialsError.value = 'Could not find your account'
      isLoading.value = false
    })
    watch(data, (_) => {
      setTimeout(() => {
        credentialsError.value = null
        isLoading.value = false
      })
    })
  }
  return {
    username,
    password,
    usernameState,
    passwordState,
    credentialsError,
    clearCredentialsError,
    validForm,
    isLoading,
    login
  }
}
