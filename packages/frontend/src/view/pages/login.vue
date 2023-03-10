<!-- eslint-disable vue/multi-word-component-names -->

<script lang="ts" setup>
import { useNuxtApp } from 'nuxt/app'
import { ref, watch } from 'vue'
import { LoginPresenter } from '../presenters'
import TextField from '@/view/components/TextField.vue'

const app = useNuxtApp()
useHead({
  title: 'Login'
})
definePageMeta({
  layout: 'login'
})
const {
  username,
  password,
  usernameState,
  passwordState,
  validForm,
  isLoading,
  mainError,
  clearCredentialsError,
  login
} = app.$loginPresenter as LoginPresenter

const previousError = ref<string>('')
watch(mainError, (error) => {
  if (error) {
    previousError.value = error
  }
})
</script>

<template>
  <div class="flex flex-col">
    <p class="font-medium text-2xl mb-3">Login</p>
    <Transition
      enter-active-class="duration-300 ease-out"
      enter-from-class="transform opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="duration-100 ease-in-out"
      leave-from-class="opacity-100"
      leave-to-class="transform opacity-0">
      <div
        v-show="mainError"
        class="bg-error/20 text-error-d2 text-sm py-2 px-4 rounded-md transition-all transform">
        <p>
          {{ mainError ?? previousError }}
        </p>
      </div>
    </Transition>

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
        <ButtonField
          :disabled="!validForm || isLoading || mainError"
          label="Submit"
          @click="login()" />
      </div>
      <div class="font-light text-xs mx-1">
        <a
          href="/reset-password"
          class="text-primary block mb-1 hover:underline"
          >Forgot your password?</a
        >
        <a href="/sign-up" class="text-dark-l2 block"
          >Don't have an account?
          <span class="text-primary hover:underline">Sign up</span></a
        >
      </div>
    </div>
  </div>
</template>
