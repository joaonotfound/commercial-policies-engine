<script lang="ts" setup>
import FeatureComponent from './FeatureComponent.vue'
</script>

<template>
  <div
    class="bg-gradient-to-bl from-primary-d2/20 to-primary-d2/30 p-10 flex flex-col items-center">
    <p
      class="text-primary/70 font-light text-xl mb-2 uppercase tracking-tighter">
      Features
    </p>
    <h2 class="text-primary-d1/70 font-bold text-3xl mb-12 tracking-wider">
      Our Features and Services.
    </h2>
    <div
      class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center justify-center gap-4">
      <FeatureComponent
        svg="/svg/fast-feature.svg"
        title="Streamlined Interaction"
        description="Efficiently manage business rules and policies for optimized interactions with customers and suppliers." />
      <FeatureComponent
        svg="/svg/custom-feature.svg"
        title="Custom Validation"
        description="Easily customize validation parameters and create validation logic using JavaScript codes for increased flexibility." />
      <FeatureComponent
        svg="/svg/integration-feature.svg"
        title="Seamless Integration"
        description="Seamlessly integrate with third-party systems for obtaining value ranges and billing history validation." />
    </div>

    <a
      href="https://storyset.com/people"
      class="text-primary-d2/80 mt-16 hover:underline"
      >People illustrations by Storyset</a
    >
  </div>
</template>
