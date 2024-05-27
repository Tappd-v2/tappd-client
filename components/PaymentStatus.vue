<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps({
  cancelled: Boolean,
})

const route = useRoute()
const costumerName = ref('...')

onMounted(async () => {
  if (!props.cancelled)
    await getCostumerName()
})

async function getCostumerName() {
  try {
    // GET http:localhost:3030/orders/${route.query.session_id}
    const response = await $fetch(`http://localhost:3030/orders/${route.query.session_id}`)
    costumerName.value = response.customer_details.name
  }
  catch (error) {
    console.error('Error fetching customer name:', error)
  }
}
</script>

<template>
  <div class="flex flex-col items-center justify-center page-height">
    <i
      v-motion-pop-visible
      class="text-7xl"
      :class="cancelled ? 'text-red-500 fas fa-times' : 'text-green-500 fas fa-check'"
    />
    <h1 class="text-2xl font-bold mt-4 w-11/12 mx-auto text-center">
      {{ cancelled ? 'Bestelling geannuleerd' : `Bedankt voor uw bestelling ${costumerName}` }}
    </h1>
    <p class="text-gray-500 text-center">
      {{ cancelled ? 'Uw bestelling is geannuleerd. Indien dit een fout is, neem dan contact op met het personeel.' : 'Uw bestelling is geplaatst.' }}
    </p>
    <div class="mt-20">
      <router-link to="/" class="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4">
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
