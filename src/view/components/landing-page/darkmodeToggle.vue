<script lang="ts" setup>
import { useNuxtApp } from 'nuxt/app'
import { ThemeProvider } from '@/view/presenters'

const app = useNuxtApp()
const theme = app.$themeProvider as ThemeProvider
const isDark = theme.isDark
</script>

<template>
  <label class="relative inline-flex items-center cursor-pointer">
    <input v-model="isDark" type="checkbox" value="" class="sr-only peer" />
    <div
      class="w-11 h-6 dark:bg-dark border-dark-l2/10 light:border bg-light peer-focus:outline-none rounded-full dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-dark-d2 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-dark-l2/20 peer-checked:after:bg-primary-d3 after:border-dark/20 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-dark-d4 dark:peer-checked:bg-primary"></div>
    <span class="ml-3 text-sm font-medium">Dark</span>
  </label>
</template>
