<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useApi } from '~/composables/useApi'

const props = defineProps({
  cancelled: Boolean,
})
const { apiGet } = useApi()
const route = useRoute()
const orderDetails = ref('...')
const userDetails = ref('...')

onMounted(async () => {
  if (!props.cancelled)
    await getCostumerName()
})

async function getCostumerName() {
  try {
    const res = await apiGet(`orders/${route.query.session_id}`)
    orderDetails.value = res.orders
    userDetails.value = res.users
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
      {{ cancelled ? 'Bestelling geannuleerd' : `Bedankt voor uw bestelling ${userDetails ? userDetails.username : '...'}` }}
    </h1>
    <p class="text-gray-500 text-center">
      {{ cancelled ? 'Uw bestelling is geannuleerd. Indien dit een fout is, neem dan contact op met het personeel.' : 'Uw bestelling is geplaatst.' }}
    </p>
    <div class="mt-20 w-full">
      <a
        :href="cancelled ? '/call-staff' : orderDetails.receiptUrl"
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
