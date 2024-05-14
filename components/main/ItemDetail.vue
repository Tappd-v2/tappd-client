<script setup>
import { ref, watch } from 'vue'

import { useOrderStore } from '~/stores/order' // Ensure the correct path

const props = defineProps({
  item: {
    type: Object,
    required: false,
  },
})

const orderStore = useOrderStore() // Initialize the order store

const amount = ref(1)
const isVisible = ref(false)

function increaseAmount() {
  amount.value++
}

function decreaseAmount() {
  if (amount.value > 0)
    amount.value--
}

watch(() => props.item, (value) => {
  if (value)
    isVisible.value = true
})

function addToOrder() {
  if (props.item && amount.value > 0)
    orderStore.addItem({ ...props.item, amount: amount.value }) // Add item to the order

  amount.value = 1
  isVisible.value = false
}
</script>

<template>
  <Sidebar
    v-model:visible="isVisible" position="bottom"
    style="height: auto"
    class="fixed bottom-0 w-full bg-white shadow-lg border-t border-gray-200"
  >
    <div class="mx-auto flex flex-col justify-between items-center">
      <div class="flex items-center justify-between w-full pb-6">
        <div>
          <h3 class="text-lg font-bold">
            {{ item?.name }}
          </h3>
          <p class="text-sm text-gray-500">
            {{ item?.description }}
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
