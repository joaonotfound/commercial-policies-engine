<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable require-await -->
<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts" setup>
import TextField from '@/view/components/TextField.vue'
import { useLoginscreenComposable } from '@/view/composables/pages'
definePageMeta({
  title: 'Login',
  layout: 'login'
})
const {
  username,
  password,
  usernameState,
  passwordState,
  validForm,
  credentialsError,
  clearCredentialsError,
  login
} = useLoginscreenComposable()
</script>

<template>
  <div class="flex flex-col">
    <div
      v-show="credentialsError"
      class="bg-error/20 text-error-d2 text-sm py-2 px-4 rounded-md">
      <p>
        {{ credentialsError }}
      </p>
    </div>
    <div class="flex-1 flex flex-col">
      <TextField
        v-model:value="username"
        label="username"
        :state="usernameState"
        placeholder="your username"
        @update:value="clearCredentialsError()" />
      <TextField
        v-model:value="password"
        text-type="password"
        label="password"
        :state="passwordState"
        placeholder="your password"
        @update:value="clearCredentialsError()" />
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
          >Don't have an account?
          <span class="text-primary hover:underline">Sign up</span></a
        >
      </div>
    </div>
  </div>
</template>
