<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts" setup>
import HomepageHeader from '../components/homepage/HomepageHeader.vue'
import HeroSection from '../components/homepage/HeroSection.vue'
import FeaturesSection from '../components/homepage/FeaturesSection.vue'
import FooterSection from '../components/homepage/FooterSection.vue'
</script>

<template>
  <div
    class="w-screen h-screen overflow-auto scrollbar-hide select-none scroll-smooth">
    <div
      class="h-screen flex tracking-wide flex-col items-center justify-start bg-gradient-to-r from-primary-d2/20 to-primary-l2/30">
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
