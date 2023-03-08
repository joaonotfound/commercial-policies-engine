<script lang="ts" setup>
import DarkmodeToggle from './darkmodeToggle.vue'
</script>

<template>
  <div
    class="sticky top-0 left-0 p-2 backdrop-blur-sm bg-light-l2/90 w-screen flex items-center justify-center shadow-md dark:shadow-sm dark:shadow-dark-d4/40 shadow-dark-l2/[4%] dark:bg-primary-d5/90">
    <div class="w-[60rem] p-2 flex justify-between items-center">
      <NuxtLink to="/">
        <p
          class="text-dark-d2 dark:text-light-d2 font-bold text-lg inline-block">
          SmartPoli
        </p>
      </NuxtLink>
      <div
        class="flex gap-10 outline-none text-dark dark:text-light items-center font-light">
        <DarkmodeToggle />
        <!-- <NuxtLink to="/contact">Contact</NuxtLink> -->
        <NuxtLink
          class="bg-primary-d1 text-light-l2 font-bold px-6 py-2 rounded-lg shadow-sm hover:bg-primary-d2/90"
          to="/sign-up">
          Try for free
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
