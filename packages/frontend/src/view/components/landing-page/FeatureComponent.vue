<script lang="ts" setup>
defineProps<{
  title: string
  description: string
  svg: string
}>()
</script>

<template>
  <div
    class="rounded-lg m-4 shadow-sm dark:shadow-xl px-4 py-8 bg-light-l2 dark:bg-gradient-to-tl from-primary-d5 to-dark-d2 dark:backdrop-blur-sm flex flex-col justify-between items-center md:w-[21rem] lg:w-[20rem] h-[100%]">
    <img :src="svg" width="150" />
    <div class="flex flex-col items-center">
      <p
        class="font-bold text-dark-d2 mb-1 text-dark-l2/80 dark:text-light-d1 text-xl">
        {{ title }}
      </p>
      <p class="text-sm text-center dark:text-light-d2/70">{{ description }}</p>
    </div>

    <button
      class="bg-primary-d2/90 dark:bg-primary-l2 hover:bg-primary-d2 rounded-md px-6 py-2 font-bold outline-none hover:shadow-sm text-[white] dark:text-primary-d5 dark:font-light">
      More
    </button>
  </div>
</template>
