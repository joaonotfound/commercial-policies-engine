<script lang="ts" setup>
import { ref } from 'vue'
import {
  faArrowDown,
  faArrowUp,
  IconDefinition
} from '@fortawesome/free-solid-svg-icons'

type Menu = {
  label: string
  icon: IconDefinition
  opened: boolean
  items: string[]
}

defineProps<{
  menu: Menu
}>()

const opened = ref<boolean>(false)
</script>

<template>
  <div>
    <div
      class="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-primary-d3 text-white"
      @click="opened = !opened">
      <i class="bi bi-chat-left-text-fill"></i>
      <div class="flex justify-between w-full items-center">
        <div>
          <font-awesome-icon :icon="menu.icon" />
          <span class="text-[15px] ml-4 text-gray-200 font-bold">{{
            menu.label
          }}</span>
        </div>

        <span id="arrow" class="text-sm text-light-l2/50">
          <font-awesome-icon :icon="opened ? faArrowUp : faArrowDown" />
        </span>
      </div>
    </div>
    <div v-if="opened">
      <div
        v-for="submenu of menu.items"
        :key="submenu"
        class="text-left text-sm mt-2 w-4/5 mx-auto text-gray-200 font-bold flex flex-col">
        <h2
          class="cursor-pointer px-4 py-3 hover:bg-primary-d3 rounded-md mt-1">
          {{ submenu }}
        </h2>
      </div>
    </div>
  </div>
</template>
