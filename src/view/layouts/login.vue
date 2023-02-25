<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div
    class="h-screen relative w-screen flex justify-center items-center bg-gradient-to-r from-primary-d2/20 to-primary-l2/30 select-none">
    <LoginHeader />
    <div
      class="bg-primary-d2/10 w-96 h-96 bg-blend-lighten rounded-full -z-10 absolute top-0 left-0 translate-y-[-25%] translate-x-[-25%]"></div>
    <div
      class="bg-primary-d2/10 w-96 h-96 bg-blend-lighten rounded-full -z-10 absolute bottom-0 right-0 translate-y-[-25%] translate-x-[-25%]"></div>
    <div class="shadow-lg px-12 py-14 rounded-md bg-light w-96">
      <p class="font-medium text-2xl mb-3">Login</p>
      <slot />
    </div>
  </div>
</template>
