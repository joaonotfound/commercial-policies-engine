<script lang="ts" setup>
defineProps<{
  title: string
  description: string
  svg: string
}>()
</script>

<template>
  <div
    class="rounded-md m-4 hover:shadow-md shadow-sm px-4 py-8 bg-light text-dark flex flex-col justify-between items-center md:w-[21rem] lg:w-[20rem] h-[100%]">
    <img :src="svg" width="150" />
    <div class="flex flex-col items-center">
      <p class="font-bold text-dark-d2 mb-1 text-primary-d2/80 text-lg">
        {{ title }}
      </p>
      <p class="text-sm text-center">{{ description }}</p>
    </div>

    <button
      class="bg-primary-d2/90 hover:bg-primary-d2 rounded-xl px-6 py-2 text-light font-bold shadow-lg outline-none">
      More
    </button>
  </div>
</template>
