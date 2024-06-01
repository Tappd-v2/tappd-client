<script setup>
import { useApi } from '~/composables/useApi'
import { useOrderStore } from '~/stores/order'

const orderStore = useOrderStore()
const { apiGet } = useApi()
const tables = ref([])

onMounted(() => {
  getTables()
})

async function getTables() {
  try {
    tables.value = await apiGet('tables', orderStore.location.id)
  }
  catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <FloatLabel class="w-full md:w-14rem">
    <Dropdown v-model="orderStore.table" input-id="dd-table" :options="tables" option-label="name" class="w-full text-black" />
    <label for="dd-table">Tafel</label>
  </FloatLabel>
</template>
