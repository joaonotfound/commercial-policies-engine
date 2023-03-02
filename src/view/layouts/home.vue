<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts" setup>
import { ref } from 'vue'
import homeHeader from '../components/home/homeHeader.vue'
const sidebarState = ref<boolean>(false)
</script>

<template>
  <div class="relative flex items-center">
    <Transition>
      <div class="flex flex-1 bg-light-d2 h-screen flex-col main">
        <homeHeader v-model:sidebar-state="sidebarState" class="z-10" />

        <div class="relative p-2 overflow-y-hidden flex-1">
          <Transition name="sidebar">
            <HomeSidebar v-show="sidebarState" class="sidebar z-10" />
          </Transition>
          <main
            v-if="sidebarState"
            class="absolute top-0 left-0 bg-dark-l2/10 w-[100%] h-screen text-light cursor-pointer"
            @click="sidebarState = false"></main>
          <slot />
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
