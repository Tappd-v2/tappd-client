<script setup>
import { ref } from 'vue'
import { useOrderStore } from '~/stores/order'

const orderStore = useOrderStore()

const tables = ref([])

onMounted(() => {
  getTables()
})

async function getTables() {
  const response = await fetch('/api/tables')
  const data = await response.json()
  tables.value = data
}

const fullOrder = ref({
  table: null,
  items: orderStore.items,
  remarks: '',
})
</script>

<template>
  <div class=" w-9/12 mx-auto">
    <h1 class="text-2xl font-bold mt-10 ">
      Checkout
    </h1>
    <div class="seperator bg-gray-300 w-full my-3" />
    <div class="my-10">
      <FloatLabel class="w-full md:w-14rem">
        <Dropdown v-model="fullOrder.table" input-id="dd-table" :options="tables" option-label="name" class="w-full text-black" />
        <label for="dd-table">Tafel</label>
      </FloatLabel>
    </div>
    <div class="my-10">
      <FloatLabel>
        <Textarea v-model="fullOrder.remarks" rows="5" cols="30" class="p-2 w-full" />
        <label>Andere opmerkingen</label>
      </FloatLabel>
    </div>
    <!-- Back to menu -->
    <NuxtLink to="/" class="bg-gray-200 text-center py-2 px-5 rounded  block">
      Terug naar menu
    </NuxtLink>
  </div>
  <OrderSummary :final-step="true" />
  <MainItemDetail />
</template>

<style scoped>
.seperator {
  height: 1px;
}
</style>
