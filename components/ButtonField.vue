<script lang="ts" setup>
defineEmits(['click', 'update:disabled'])
defineProps<{
  label: string
  disabled?: boolean
  type?: 'primary' | 'light'
}>()
</script>
<template>
  <div>
    <button
      :disabled="disabled"
      :class="type ?? 'primary'"
      class="py-2 rounded-md px-5 font-normal cursor-pointer transition ease-in-out hover:shadow-sm m-1 focus:shadow-md outline-none"
      @click="$emit('click')"
    >
      {{ label }}
    </button>
  </div>
</template>
<style scoped>
.light {
  @apply bg-light-l2 border border-solid border-light-d2 text-dark-l2/70 font-medium focus:shadow-md;
}
.primary {
  @apply bg-primary-d1 text-light-l2 hover:bg-primary-d2 disabled:bg-primary-l1 focus:outline-none hover:shadow-primary-l1/30;
}
</style>
