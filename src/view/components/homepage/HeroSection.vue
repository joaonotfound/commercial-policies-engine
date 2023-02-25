<script lang="ts" setup></script>

<template>
  <div class="shadow-sm w-screen flex justify-center">
    <div
      class="p-12 w-[60rem] flex md:flex-row sm:flex-col-reverse sm:justify-center items-center">
      <div>
        <h1 class="text-dark-d2 font-bold text-6xl mb-2 tracking-wide">
          SmartPoli
        </h1>
        <p class="w-[25rem] text-dark-d1 text-lg font-light">
          <i>SmartPoli</i>: A powerful tool to manage payment terms, discounts
          and interactions with customers and suppliers, optimizing time and
          processes.
        </p>
        <div class="mt-8 flex gap-3">
          <NuxtLink to="/login">
            <button
              class="px-8 py-2 bg-primary-d2/80 rounded-md shadow-md text-light-l2 font-bold cursor-pointer hover:shadow-lg hover:bg-primary-d2 outline-none">
              Try for free
            </button>
          </NuxtLink>
          <NuxtLink
            to="https://gitlab.com/joaonotfound/commercial-policies-engine">
            <button
              class="px-8 py-2 bg-[#e24329]/80 rounded-md shadow-md text-light-l2 font-bold cursor-pointer hover:shadow-lg outline-none">
              <div class="flex items-center justify-center gap-3">
                <div>
                  <font-awesome-icon icon="fa-brands fa-gitlab" />
                </div>
                <span> Project </span>
              </div>
            </button>
          </NuxtLink>
        </div>
      </div>
      <div class="hidden md:block text-light sm:hidden md:w-[20rem] lg:w-max">
        <img
          src="/svg/hero-svg.svg"
          width="700"
          height="1"
          alt="gears image jpg" />
      </div>
    </div>
  </div>
</template>
