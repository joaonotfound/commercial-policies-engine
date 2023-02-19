<script lang="ts" setup>
import { computed, ref } from 'vue'
import TextField from '../components/TextField.vue'
import {
  usePasswordValidator,
  useUsernameValidator
} from '../composables/validators'

const username = ref<string | null>(null)
const password = ref<string | null>(null)

const passwordState = computed(() => usePasswordValidator(password.value))
const usernameState = computed(() => useUsernameValidator(username.value))
const validForm = computed(
  () =>
    username.value != null &&
    password.value != null &&
    (passwordState.value == null || passwordState.value.level === 'success') &&
    usernameState.value == null
)
const login = () => {
  console.log(username.value, password.value)
}
</script>

<template>
  <div>
    <TextField
      v-model:value="username"
      label="username"
      :state="usernameState"
      placeholder="your username"
    />
    <TextField
      v-model:value="password"
      text-type="password"
      label="password"
      :state="passwordState"
      placeholder="your password"
    />
    <ButtonField :disabled="!validForm" label="Submit" @click="login()" />
  </div>
</template>
