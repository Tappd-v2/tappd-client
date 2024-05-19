<script setup>
import { useMenu } from '~/composables/useMenu'
import { useOrderStore } from '~/stores/order'

const { fetchCategories, fetchItems, menu, filterItems } = useMenu()

useHead({
  title: 'Home',
})

const orderStore = useOrderStore()
const isLoading = ref(true)

onMounted(async () => {
  await fetchCategories()
  await fetchItems()
  isLoading.value = false
})
</script>

<template>
  <div>
    <div v-if="isLoading" class="loadingContainer w-full flex items-center justify-center">
      <ProgressSpinner
        style="width: 50px; height: 50px" stroke-width="8" fill="var(--surface-ground)"
        animation-duration=".5s" aria-label="Custom ProgressSpinner"
      />
    </div>

    <div v-else>
      <MainSearch :filter-items="filterItems" />
      <MainCategories :menu="menu" />
      <MainMenu :menu="menu" :store="orderStore" />
      <OrderSummary v-if="orderStore.items.length > 0" />
      <MainNoResults v-if="!menu.length" />
    </div>
  </div>
</template>

<style scoped>
.loadingContainer {
  height: calc(100vh - 30rem); /* 30rem is the height of the hero */
}
</style>
