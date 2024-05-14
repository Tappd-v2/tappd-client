<script setup>
import { useMenu } from '~/composables/useMenu'

const { fetchCategories, fetchItems, menu, filterItems } = useMenu()

useHead({
  title: 'Home',
  meta: [
    {
      name: 'description',
      content: 'Tappd is an online ordering service for restaurants, bars, and cafes.',
    },
  ],
  titleTemplate: 'Tappd - %s',
})

onMounted(async () => {
  await fetchCategories()
  await fetchItems()
})
</script>

<template>
  <div>
    <MainSearch :filter-items="filterItems" />
    <MainCategories :menu="menu" />
    <MainMenu :menu="menu" />
    <MainNoResults v-if="!menu.length" />
    <BackToTop />
  </div>
</template>
