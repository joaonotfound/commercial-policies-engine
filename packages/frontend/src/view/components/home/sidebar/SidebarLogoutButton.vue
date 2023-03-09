<script lang="ts" setup>
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
</script>

<template>
  <div
    class="p-4 hover:pl-5 flex items-center rounded-md duration-150 cursor-pointer hover:bg-primary-d3">
    <font-awesome-icon :icon="faRightFromBracket" />
    <span class="text-sm ml-4 font-light-d2">Logout</span>
  </div>
</template>
