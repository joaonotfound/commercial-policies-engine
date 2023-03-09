<!-- eslint-disable vue/html-closing-bracket-newline -->
<!-- eslint-disable vue/html-self-closing -->
<template>
  <div class="mt-2 h-[5rem]">
    <label
      for="text-field"
      class="font-light text-sm focus:border-blue text-dark-l2 inline-block capitalize">
      {{ label }}
    </label>
    <div class="relative">
      <input
        id="text-field"
        :placeholder="placeholder"
        :type="showing ? 'text' : textType ?? 'text'"
        :class="`${state?.level}-input`"
        :value="value"
        class="transition w-[100%] rounded-sm text-base py-2 pl-4 pr-2 ease-in-out text-dark-d2 block border border-solid border-light-d2 bg-light focus:bg-primary-l3 focus:border-primary-l1 focus:outline-none"
        @input="$emit('update:value', ($event.target as any).value)" />

      <button
        v-if="textType == 'password'"
        tabindex="-1"
        class="absolute cursor-pointer top-[53%] translate-y-[-50%] right-0 mr-4"
        @click.prevent="toggleShowing">
        <font-awesome-icon
          class="text-dark-l2/70 transition-all ease-in"
          :class="{
            'text-error': state?.level == 'error',
            'text-success': state?.level == 'success'
          }"
          :icon="showing ? faEyeSlash : faEye" />
      </button>
    </div>
    <p
      v-if="state"
      :class="state.level"
      class="ml-1 text-xs mt-1 font-light ruby">
      {{ state?.message }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { ref } from 'vue'
import { InputState } from '../protocols'
defineEmits(['update:value'])
defineProps<{
  textType?: string
  placeholder?: string
  label?: string
  value: any
  state?: InputState | null
}>()

const showing = ref<boolean>(false)
const toggleShowing = () => (showing.value = !showing.value)
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
