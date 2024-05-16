<script setup>
import { onMounted, ref } from 'vue'
import { loadStripe } from '@stripe/stripe-js'
import { useOrderStore } from '~/stores/order'

const orderStore = useOrderStore()
const config = useRuntimeConfig()
const stripe = ref(null)

watchEffect(
  () => orderStore.items,
)

onMounted(async () => {
  stripe.value = await loadStripe(config.public.stripePublishableKey)
})

async function handleCheckout() {
  try {
    const response = await $fetch('/api/create-checkout-session', {
      method: 'POST',
      body: JSON.stringify(
        {
          items: orderStore.items.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.amount,
          })),
        }),
      headers: { 'Content-Type': 'application/json' },
    })
    const sessionId = response.id
    const result = await stripe.value.redirectToCheckout({ sessionId })
    if (result.error)
      console.error(result.error.message)
  }
  catch (error) {
    console.error('Error:', error)
  }
}
const orderDetailsVisible = ref(false)
function toggleOrderDetails() {
  orderDetailsVisible.value = !orderDetailsVisible.value
}
</script>

<template>
  <div
    class="fixed bottom-0 w-full bg-white shadow-lg border-t border-gray-200"
    @touchstart="onTouchStart"
    @touchend="onTouchEnd"
  >
    <button
      class="w-full py-4 text-center text-lg font-bold"
      @click="toggleOrderDetails"
    >
      <i
        :class="orderDetailsVisible ? 'fa fa-chevron-down' : 'fa fa-chevron-up'"
        aria-hidden="true"
      />
    </button>

    <div class="mx-auto flex justify-between items-center p-4 pt-0">
      <div>
        <p class="text-sm text-left text-gray-500">
          Total items: {{ orderStore.itemCount }}
        </p>
        <p class="text-lg font-bold">
          Total price: &#8364;{{ orderStore.itemTotal }}
        </p>
      </div>
      <button
        class="bg-blue-500 text-white px-4 py-2 rounded-lg"
        @click="handleCheckout"
      >
        Checkout
      </button>
    </div>
    <div
      :class="[
        orderDetailsVisible ? 'h-auto p-4 border-t border-gray-200' : 'h-0',
      ]"
      class="order-details"
    >
      <div
        v-for="item in orderStore.items"
        :key="item.id"
        class="flex justify-between items-center py-2"
      >
        <p class="text-lg">
          {{ item.amount }}x {{ item.name }}
        </p>
        <button
          class="text-gray-500"
          @click="orderStore.removeItem(item.id)"
        >
          <i class="fa fa-trash" aria-hidden="true" />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.order-details {
  transition: all 0.3s;
}
</style>
