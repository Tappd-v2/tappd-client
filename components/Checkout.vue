<script setup>
import { onMounted, ref } from 'vue'
import { loadStripe } from '@stripe/stripe-js'
import { useRuntimeConfig } from '#app'

const config = useRuntimeConfig()
const stripe = ref(null)

onMounted(async () => {
  stripe.value = await loadStripe(config.public.stripePublishableKey)
})

async function handleCheckout() {
  try {
    const response = await $fetch('/api/create-checkout-session', {
      method: 'POST',
      body: JSON.stringify({ items: [{ id: 1, name: 'Sample Item', price: 1000, quantity: 1 }] }),
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
</script>

<template>
  <div>
    <button
      class="
      px-4 py-2
      text-white
      bg-blue-500
      rounded
      hover:bg-blue-600
    "
      @click="handleCheckout"
    >
      Checkout
    </button>
  </div>
</template>
