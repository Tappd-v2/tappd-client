<script setup>
defineProps({
  totalItems: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
})
</script>

<template>
  <div class="fixed bottom-0 w-full bg-white shadow-lg border-t border-gray-200">
    <div class="mx-auto flex justify-between items-center p-4">
      <div>
        <p class="text-sm text-gray-500">
          Total items: {{ totalItems }}
        </p>
        <p class="text-lg font-bold">
          Total price: ${{ totalPrice }}
        </p>
      </div>
      <button
        class="bg-blue-500 text-white px-4 py-2 rounded-lg"
        @click="checkout"
      >
        Checkout
      </button>
    </div>
  </div>
</template>
