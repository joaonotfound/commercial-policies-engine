<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts" setup>
import { computed, ref } from 'vue'
import TextField from '../components/TextField.vue'

import {
  usePasswordValidator,
  useUsernameValidator
} from '../composables/validators'

definePageMeta({
  layout: 'login'
})

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
  <div class="flex flex-col">
    <div class="flex-1 flex flex-col">
      <TextField
        v-model:value="username"
        label="username"
        :state="usernameState"
        placeholder="your username" />
      <TextField
        v-model:value="password"
        text-type="password"
        label="password"
        :state="passwordState"
        placeholder="your password" />
    </div>
    <div class="justify-end">
      <div class="mt-6 mb-2">
        <ButtonField :disabled="!validForm" label="Submit" @click="login()" />
      </div>
      <div class="font-light text-xs mx-1">
        <a
          href="/reset-password"
          class="text-primary block mb-1 hover:underline"
          >Forgot your password?</a
        >
        <a href="/signup" class="text-dark-l2 block"
          >Don't have a account?
          <span class="text-primary hover:underline">Sign up</span></a
        >
      </div>
    </div>
  </div>
</template>
