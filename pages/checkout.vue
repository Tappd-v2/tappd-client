<script setup>
import { onMounted, ref } from 'vue'
import { useOrderStore } from '~/stores/order'
import { useApi } from '~/composables/useApi'

const orderStore = useOrderStore()
const { apiGet } = useApi()
const tables = ref([])

onMounted(() => {
  getTables()
})

async function getTables() {
  try {
    tables.value = await apiGet('tables')
  }
  catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <div class=" w-9/12 mx-auto">
    <h1 class="text-2xl font-bold mt-10 ">
      Uitchecken
    </h1>
    <div class="separator bg-gray-300 w-full my-3" />
    <div class="my-10">
      <FloatLabel class="w-full md:w-14rem">
        <Dropdown v-model="orderStore.table" input-id="dd-table" :options="tables" option-label="name" class="w-full text-black" />
        <label for="dd-table">Tafel</label>
      </FloatLabel>
    </div>
    <div class="my-10">
      <FloatLabel>
        <Textarea v-model="orderStore.remarks" rows="5" cols="30" class="p-2 w-full" />
        <label>Andere opmerkingen</label>
      </FloatLabel>
    </div>
    <NuxtLink to="/" class="bg-gray-200 text-center py-2 px-5 rounded  block">
      Terug naar menu
    </NuxtLink>
  </div>
  <OrderSummary :final-step="true" />
  <MainItemDetail />
</template>

<style scoped>
.separator {
  height: 1px;
}
</style>
