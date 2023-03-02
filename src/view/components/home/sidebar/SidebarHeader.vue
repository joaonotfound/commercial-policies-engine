<script lang="ts" setup>
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import SidebarDivider from './SidebarDivider.vue'
</script>

<template>
  <h1 class="font-bold text-xl ml-3 text-left m-2">SmartPoli</h1>

  <SidebarDivider />
  <div
    class="p-3 flex items-center rounded-md px-4 duration-300 cursor-pointer text-white bg-dark-l2/70">
    <font-awesome-icon :icon="faSearch" />
    <input
      type="text"
      placeholder="Search"
      class="text-[15px] ml-4 w-full bg-[transparent] focus:outline-none" />
  </div>
</template>
