<script lang="ts" setup></script>

<template>
  <div class="shadow-sm w-screen flex justify-center bg-primar">
    <div
      class="p-12 w-[60rem] flex md:flex-row sm:flex-col-reverse sm:justify-center items-center">
      <div>
        <h1
          class="text-center sm:text-left text-dark-d2 font-bold text-6xl mb-2 tracking-wide">
          SmartPoli
        </h1>
        <p
          class="text-center sm:text-left sm:text-lg w-[100%] sm:w-[25rem] text-dark-d1 font-light">
          A powerful tool to manage payment terms, discounts and interactions
          with customers and suppliers, optimizing time and processes.
        </p>
        <div class="justify-center sm:justify-start mt-8 flex gap-2">
          <NuxtLink to="/login">
            <button
              class="px-8 py-2 bg-primary-d2/80 rounded-md text-light-l2 font-bold cursor-pointer outline-none hover:shadow-md">
              Try now
            </button>
          </NuxtLink>
          <NuxtLink
            to="https://gitlab.com/joaonotfound/commercial-policies-engine">
            <button
              class="px-8 py-2 bg-[#e24329]/80 rounded-md text-light-l2 font-bold cursor-pointer outline-none hover:shadow-md">
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
          src="/svg/stipple/finance.svg"
          width="700"
          height="1"
          alt="gears image jpg" />
      </div>
    </div>
  </div>
</template>
