<script setup>
import { ref, watch } from 'vue'

import { useOrderStore } from '~/stores/order'

const orderStore = useOrderStore()

const amount = ref(1)
const isVisible = ref(false)

function increaseAmount() {
  amount.value++
}

function decreaseAmount() {
  if (amount.value > 0)
    amount.value--
}

watch(() => orderStore.selectedItem, (value) => {
  if (value)
    isVisible.value = true
})

watch(() => orderStore.selectedItem, () => {
  amount.value = 1
})

function addToOrder() {
  if (orderStore.selectedItem && amount.value > 0)
    orderStore.addItem({ ...orderStore.selectedItem, amount: amount.value }) // Add item to the order

  amount.value = 1
  isVisible.value = false
}
</script>

<template>
  <Sidebar
    v-model:visible="isVisible" position="bottom"
  >
    <div class="mx-auto flex flex-col justify-between items-center">
      <div class="flex items-center justify-between w-full pb-6">
        <div>
          <h3 class="text-lg font-bold">
            {{ orderStore.selectedItem?.name }}
          </h3>
          <p class="text-sm text-gray-500">
            {{ orderStore.selectedItem?.description }}
          </p>
        </div>
        <div class="flex items-center">
          <button
            class="bg-blue-500 text-white px-3 py-2 rounded-lg"
            @click="decreaseAmount"
          >
            <i class="fas fa-minus" />
          </button>
          <span class="mx-3 text-xl">{{ amount }}</span>
          <button
            class="bg-blue-500 text-white px-3 py-2 rounded-lg"
            @click="increaseAmount"
          >
            +
          </button>
        </div>
      </div>

      <button
        class="text-white px-3 py-3 w-full"
        :class="amount > 0 ? 'bg-blue-500' : 'bg-red-500'"
        @click="addToOrder"
      >
        {{ amount > 0 ? 'Add to cart' : 'Cancel' }}
      </button>
    </div>
  </Sidebar>
</template>
