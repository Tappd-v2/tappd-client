<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps({
  cancelled: Boolean,
})

const route = useRoute()
const orderDetails = ref('...')

onMounted(async () => {
  if (!props.cancelled)
    await getCostumerName()
})

async function getCostumerName() {
  try {
    orderDetails.value = await $fetch(`http://localhost:3030/orders/${route.query.session_id}`)
  }
  catch (error) {
    console.error('Error fetching customer name:', error)
  }
}
</script>

<template>
  <div class="flex flex-col items-center justify-center page-height  w-11/12 mx-auto">
    <i
      v-motion-pop-visible
      class="text-7xl"
      :class="cancelled ? 'text-red-500 fas fa-times' : 'text-green-500 fas fa-check'"
    />
    <h1 class="text-2xl font-bold mt-4  text-center">
      {{ cancelled ? 'Bestelling geannuleerd' : `Bedankt voor uw bestelling ${orderDetails.username ? orderDetails.username : '...'}` }}
    </h1>
    <p class="text-gray-500 text-center">
      {{ cancelled ? 'Uw bestelling is geannuleerd. Indien dit een fout is, neem dan contact op met het personeel.' : 'Uw bestelling is geplaatst.' }}
    </p>
    <div class="mt-20 w-full">
      <a
        :href="cancelled ? '/call-staff' : orderDetails.receipt_url"
        :target="cancelled ? '_self' : '_blank'"
        class="bg-gray-300  px-4 py-2 text-center rounded-lg block"
      >
        {{ cancelled ? 'Neem contact op' : 'Ontvangsbewijs bekijken' }}
      </a>

      <router-link to="/" class="block  text-center bg-blue-500 text-white px-4 py-2 rounded-lg mt-4">
        Terug naar menu
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.page-height {
  height: calc(100vh - 20rem);
}
</style>
