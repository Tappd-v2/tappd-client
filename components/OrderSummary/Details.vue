<script setup>
import { useOrderStore } from '~/stores/order'

defineProps({
  showDetails: {
    type: Boolean,
    required: true,
  },
})

const orderStore = useOrderStore()

function removeItem(itemId) {
  // Add removing class before removing from store
  document.getElementById(itemId).classList.add('removing')
  setTimeout(() => {
    orderStore.removeItem(itemId)
  }, 300) // Wait for the transition to finish
}
</script>

<template>
  <div
    :class="[
      showDetails ? 'h-auto p-4 border-t border-gray-200' : 'h-0', // h-0 instead of hidden for animation
    ]"
    class="order-details"
  >
    <div
      v-for="item in orderStore.items"
      :id="item.id"
      :key="item.id" class="flex justify-between items-center py-2"
    >
      <p class="text-lg">
        {{ item.amount }}x {{ item.name }}
      </p>
      <button
        class="text-gray-500"
        @click.prevent="removeItem(item.id)"
      >
        <i class="fa fa-trash" aria-hidden="true" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.order-details {
  transition: all 0.3s; /* Base transition for smooth show/hide */
}

.order-details > div { /* Style for each item */
  transform: translateX(0); /* Initial position */
  transition: transform 0.3s ease-in-out; /* Transition for sliding */
}

.order-details > div.removing {  /* New class for removing items */
  transform: translateX(-120%); /* Slide off-screen to the left */
}
</style>
