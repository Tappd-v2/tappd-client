<script setup>
import { onMounted, ref } from 'vue'
import { loadStripe } from '@stripe/stripe-js'
import { useOrderStore } from '~/stores/order'

const props = defineProps({
  finalStep: {
    type: Boolean,
    default: false,
  },
})
const $router = useRouter()
const orderStore = useOrderStore()
const config = useRuntimeConfig()
const stripe = ref(null)
const orderDetailsVisible = ref(false)

watchEffect(
  () => orderStore.items,
)

onMounted(async () => {
  stripe.value = await loadStripe(config.public.stripePublishableKey)
})

async function handleCheckoutButtonClick() {
  if (props.finalStep)
    await createCheckoutSession()

  else
    $router.push('/checkout')
}

async function createCheckoutSession() {
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
          table: orderStore.table,
          remarks: orderStore.remarks,
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

function toggleOrderDetails() {
  orderDetailsVisible.value = !orderDetailsVisible.value
}
</script>

<template>
  <div class="fixed bottom-0 w-full bg-white shadow-lg border-t border-gray-200">
    <button
      class="w-full pt-4 text-center text-lg font-bold"
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
        @click="handleCheckoutButtonClick"
      >
        {{ props.finalStep ? 'Afrekenen' : 'Bestellen' }}
      </button>
    </div>

    <OrderSummaryDetails
      :show-details="orderDetailsVisible"
    />
  </div>
</template>

<style scoped>
.order-details {
  transition: all 0.3s;
}
</style>
