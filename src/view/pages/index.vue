<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts" setup>
import HomepageHeader from '../components/landing-page/HomepageHeader.vue'
import HeroSection from '../components/landing-page/HeroSection.vue'
import FeaturesSection from '../components/landing-page/FeaturesSection.vue'
import FooterSection from '../components/landing-page/FooterSection.vue'

useHead({
  title: 'SmartPoli'
})
</script>

<template>
  <div
    class="w-screen h-screen overflow-auto scrollbar-hide select-none scroll-smooth">
    <div
      class="h-screen flex tracking-wide flex-col items-center justify-start">
      <HomepageHeader />
      <HeroSection class="flex-1" />
    </div>
    <FeaturesSection />
    <FooterSection />
  </div>
</template>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
