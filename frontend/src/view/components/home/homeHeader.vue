<script lang="ts" setup>
import {
  faListDots,
  faArrowLeft,
  faCircleUser
} from '@fortawesome/free-solid-svg-icons'

defineEmits(['update:sidebarState'])
defineProps<{
  sidebarState: boolean
}>()
</script>

<template>
  <header
    class="bg-primary-d5 flex justify-between items-center text-light px-6 py-3 shadow-lg">
    <div class="flex items-center gap-5">
      <font-awesome-icon
        class="cursor-pointer"
        :icon="sidebarState ? faArrowLeft : faListDots"
        @click="$emit('update:sidebarState', !sidebarState)" />
      <h2 class="font-bold tracking-wider text-lg">SmartPoli</h2>
    </div>
    <div class="cursor-pointer">
      <font-awesome-icon class="text-2xl" :icon="faCircleUser" />
    </div>
  </header>
</template>
