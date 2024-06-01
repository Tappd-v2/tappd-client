<script setup>
import { ref } from 'vue'
import { useOrderStore } from '~/stores/order'

const orderStore = useOrderStore()
const route = useRoute()
</script>

<template>
  <div class=" w-9/12 mx-auto">
    <MainTitle title="Bestelling afronden" />
    <div class="my-10">
      <FormTablePicker />
    </div>
    <div class="my-10">
      <FloatLabel>
        <Textarea v-model="orderStore.remarks" rows="5" cols="30" class="p-2 w-full" />
        <label>Andere opmerkingen</label>
      </FloatLabel>
    </div>
    <NuxtLink
      :to="`/venues/${route.params.location}/menu`"
      class="bg-gray-200 text-center py-2 px-5 rounded  block"
    >
      Terug naar menu
    </NuxtLink>
  </div>
  <OrderSummary :final-step="true" />
  <MainItemDetail />
</template>
