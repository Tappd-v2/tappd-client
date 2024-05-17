<script setup>
import { ref, watch } from 'vue'

import { useOrderStore } from '~/stores/order'

const orderStore = useOrderStore()

const amount = ref(1)
const isVisible = ref(false)
const itemAlreadyInOrder = computed(() => orderStore.items.some(item => item.id === orderStore.selectedItem?.id))
const originalAmount = computed(() => orderStore.items.find(item => item.id === orderStore.selectedItem?.id)?.amount)

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
  if (itemAlreadyInOrder.value)
    amount.value = originalAmount.value
  else
    amount.value = 1
})

function handleButtonClick() {
  if (amount.value === 0 && itemAlreadyInOrder.value)
    removeFromOrder()
  else
    addToOrder()
}

function addToOrder() {
  if (amount.value === 0) {
    isVisible.value = false
    return
  }
  if (itemAlreadyInOrder.value)
    orderStore.updateItem(orderStore.selectedItem.id, amount.value) // Update item in the order
  else
    orderStore.addItem({ ...orderStore.selectedItem, amount: amount.value }) // Add item to the order
  isVisible.value = false
}

function removeFromOrder() {
  if (orderStore.selectedItem)
    orderStore.removeItem(orderStore.selectedItem.id) // Remove item from the order

  isVisible.value = false
}

function getButtonLabel(amount) {
  if (itemAlreadyInOrder.value && amount === 0)
    return 'Remove from order'
  else if (itemAlreadyInOrder.value && amount === originalAmount.value)
    return 'Go back'
  else if (!itemAlreadyInOrder.value && amount === 0)
    return 'Cancel'
  else if (amount > 0 && itemAlreadyInOrder.value)
    return 'Update order'
  else
    return 'Add to order'
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
        @click="handleButtonClick"
      >
        {{ getButtonLabel(amount) }}
      </button>
    </div>
  </Sidebar>
</template>
