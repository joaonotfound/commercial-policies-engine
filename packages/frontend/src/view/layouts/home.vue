<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts" setup>
import { useNuxtApp } from 'nuxt/app'
import homeHeader from '../components/home/homeHeader.vue'
import { SidebarProvider, ThemeProvider } from '../presenters'

const app = useNuxtApp()
const themes = app.$themeProvider as ThemeProvider
const isDark = themes.isDark
const sidebar = app.$sidebarProvider as SidebarProvider

const sidebarState = sidebar.opened
</script>

<template>
  <div
    class="relative flex items-center"
    :class="{
      dark: isDark
    }">
    <Transition>
      <div class="flex flex-1 bg-light-d2 h-screen flex-col main">
        <homeHeader v-model:sidebar-state="sidebarState" class="z-10" />

        <div
          class="relative overflow-y-hidden flex-1 dark:bg-dark-l2 dark:text-light-d2">
          <Transition name="sidebar">
            <HomeSidebar v-show="sidebarState" class="sidebar z-20" />
          </Transition>

          <div
            v-if="sidebarState"
            class="absolute top-0 left-0 bg-dark-l2/10 z-10 w-[100%] h-screen text-light cursor-pointer"
            @click="sidebarState = false"></div>
          <main class="h-[100%] overflow-y-auto p-2">
            <slot />
          </main>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.sidebar-enter-active {
  animation: slideIn 0.13s ease-in;
}

.sidebar-leave-active {
  animation: slideOut 0.1s ease-out;
}

@keyframes slideIn {
  from {
    /* margin-left: -100%; */
    transform: translateX(-100%);
  }
  to {
    /* transform: translateX(0); */
  }
}
@keyframes slideOut {
  from {
    display: block;
    /* transform: translateX(0); */
  }
  to {
    /* margin-left: -100%; */
    transform: translateX(-100%);
  }
}
</style>
