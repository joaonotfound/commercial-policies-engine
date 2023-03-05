<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts" setup>
import { ref } from 'vue'
import {
  faPlay,
  faArrowsSpin,
  faFloppyDisk
} from '@fortawesome/free-solid-svg-icons'

definePageMeta({
  layout: 'home'
})

const content = ref<string>(`
/* do not delete this declaration of types */
type OrderItem = {
  price: number
}
type Discount = {
  startPrice: number,
  discountApplied: number,
  endPrice: number
}
export default async function calculateDiscount(order: OrderItem): Promise<Discount> {
  /* he goes all the logic of the function and you must return the response */
  const discount = 0.5
  return {
    startPrice: order.price,
    discountApplied: 100 * discount,
    endPrice: order.price * discount
  }
}`)

const options = {
  theme: 'vs-dark'
}
</script>

<template>
  <div class="h-[100%] w-[100%] bg-[#1E1E1E] flex flex-col">
    <div class="py-2 px-4 pb-3 flex gap-2 justify-between">
      <div class="flex gap-2">
        <button
          class="text-light text-sm bg-dark-l2 hover:bg-dark-l1 hover:shadow-sm px-4 py-1 outline-none rounded-sm flex gap-2 items-center justify-center">
          <font-awesome-icon :icon="faPlay"></font-awesome-icon>
          Execute
        </button>
        <button
          class="text-light text-sm bg-dark-l2 hover:bg-dark-l1 hover:shadow-sm px-4 py-1 outline-none rounded-sm flex gap-2 items-center justify-center">
          <font-awesome-icon :icon="faArrowsSpin"></font-awesome-icon>
          Check
        </button>
      </div>

      <div>
        <button
          class="text-light text-sm bg-primary-d3/80 hover:bg-primary-d3 hover:shadow-sm px-4 py-1 rounded-sm flex gap-2 items-center justify-center">
          <font-awesome-icon :icon="faFloppyDisk"></font-awesome-icon>
          Salvar
        </button>
      </div>
    </div>
    <div class="flex flex-1">
      <MonacoEditor
        v-model="content"
        class="w-[100%]"
        :options="options"
        lang="typescript" />
    </div>
  </div>
</template>
