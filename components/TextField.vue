<template>
  <div class="mt-2">
    <label
      for="text-field"
      class="text-md focus:border-blue text-dark-d2 mb-1 inline-block capitalize"
    >
      {{ label }}
    </label>
    <input
      id="text-field"
      :placeholder="placeholder"
      :type="textType ?? 'text'"
      :class="`${state?.level}-input`"
      class="transition rounded-md text-base py-2 pl-4 pr-2 ease-in-out text-dark-d2 block border border-solid border-light-d2 bg-light focus:bg-primary-l3 focus:border-primary-l1 focus:outline-none"
    >
    <p v-if="state" :class="state.level" class="">
      {{ state?.message }}
    </p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  textType?: string
  placeholder?: string
  label?: string
  state?: {
    level: 'success' | 'warning' | 'error'
    message: string
  }
}>()
</script>
<style scoped>
.warning-input {
  @apply bg-warning-l2 border-warning text-warning;
}

.error-input {
  @apply bg-error-l2 border-error text-error;
}

.success-input {
  @apply bg-success-l2 border-success text-success;
}

.warning,
.error,
.success {
  @apply ml-1 capitalize;
}

.error {
  @apply text-error;
}

.success {
  @apply text-success;
}

.warning {
  @apply text-warning;
}
</style>
