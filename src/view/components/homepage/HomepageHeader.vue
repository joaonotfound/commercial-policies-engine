<template>
  <div
    class="sticky top-0 left-0 p-2 backdrop-blur-sm w-screen flex items-center justify-center">
    <div class="w-[60rem] p-2 flex justify-between items-center">
      <p class="text-dark-d2 font-bold text-lg inline-block">SmartPoli</p>

      <div class="flex gap-10 outline-none text-dark items-center font-light">
        <NuxtLink to="/contact">Contact</NuxtLink>
        <NuxtLink
          class="bg-primary-d1 text-light-l2 font-bold px-6 py-2 rounded-lg shadow-sm hover:bg-primary-d2/90"
          to="/sign-up">
          Try for free
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
