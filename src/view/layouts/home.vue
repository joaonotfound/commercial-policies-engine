<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts" setup>
import { ref } from 'vue'
import homeHeader from '../components/home/homeHeader.vue'
const sidebarState = ref<boolean>(false)
</script>

<template>
  <div class="flex">
    <HomeSidebar v-show="sidebarState" />
    <div class="flex flex-1 bg-light-d2 h-screen flex-col">
      <homeHeader v-model:sidebar-state="sidebarState" class="z-10" />

      <div class="relative p-2 overflow-y-hidden flex-1">
        <div
          v-if="sidebarState"
          class="absolute top-0 left-0 bg-dark-l2/10 w-[100%] h-screen text-light cursor-pointer"
          @click="sidebarState = false"></div>
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>
.main {
  transition: ease-linear;
}
.sidebar-enter-active {
  animation: slideIn 0.1s ease-out;
}

.sidebar-leave-active {
  animation: slideOut 0.1s ease-out;
}

@keyframes slideIn {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}
@keyframes slideOut {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
}
</style>
