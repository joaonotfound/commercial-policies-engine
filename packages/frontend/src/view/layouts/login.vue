<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div
    class="h-screen relative w-screen flex justify-center items-center bg-gradient-to-r from-primary-l2/20 to-light-l2/30 select-none">
    <LoginHeader />
    <div
      class="bg-primary-l2/10 w-96 h-96 bg-blend-lighten rounded-full -z-10 absolute top-0 left-0 translate-y-[-25%] translate-x-[-25%]"></div>
    <div
      class="bg-primary/5 w-96 h-96 bg-blend-lighten rounded-full -z-10 absolute bottom-0 right-0 translate-y-[-25%] translate-x-[-25%]"></div>
    <div class="shadow-xl px-12 py-14 rounded-md bg-light-l2 w-96">
      <slot />
    </div>
  </div>
</template>
