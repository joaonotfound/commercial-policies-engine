<!-- eslint-disable vue/html-closing-bracket-newline -->
<!-- eslint-disable vue/html-self-closing -->
<template>
  <div class="mt-2">
    <label
      for="text-field"
      class="text-md focus:border-blue text-dark-d2 inline-block capitalize">
      {{ label }}
    </label>
    <input
      id="text-field"
      :placeholder="placeholder"
      :type="textType ?? 'text'"
      :class="`${state?.level}-input`"
      :value="value"
      class="transition rounded-sm text-base py-2 pl-4 pr-2 ease-in-out text-dark-d2 block border border-solid border-light-d2 bg-light focus:bg-primary-l3 focus:border-primary-l1 focus:outline-none"
      @input="$emit('update:value', ($event.target as any).value)" />
    <p v-if="state" :class="state.level" class="ml-1 text-xs mt-1 font-medium">
      {{ state?.message }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { InputState } from '../composables'

defineEmits(['update:value'])
defineProps<{
  textType?: string
  placeholder?: string
  label?: string
  value: any
  state?: InputState | null
}>()
</script>
<style scoped>
.warning-input {
  @apply bg-warning-l2 border-warning text-warning placeholder:text-warning-l1;
}

.error-input {
  @apply bg-error-l2 border-error text-error placeholder:text-error-l1;
}

.success-input {
  @apply bg-success-l2 border-success text-success;
}

.error {
  @apply text-error placeholder:text-error-d2;
}

.success {
  @apply text-success;
}

.warning {
  @apply text-warning;
}
</style>
