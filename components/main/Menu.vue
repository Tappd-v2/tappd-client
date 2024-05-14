<script setup>
import { onMounted, ref } from 'vue'
import { useMenu } from '~/composables/useMenu'

const { fetchCategories, fetchItems, menu, search, filterItems } = useMenu()

const formatName = name => name.toLowerCase().replace(/\s/g, '-')

onMounted(async () => {
  await fetchCategories()
  await fetchItems()
})

watch(search, () => {
  filterItems()
})
</script>

<template>
  <IconField icon-position="left" unstyled class="w-11/12 mx-auto mt-10 bg-white flex ">
    <InputIcon class="pi pi-search p-2 text-gray-500" />
    <InputText v-model="search" placeholder="Search" unstyled class="border-0 flex-grow focus:outline-none" />
  </IconField>

  <ul
    class="
    flex
    mt-5
    w-11/12
    mx-auto
    gap-5
    overflow-x-auto
  "
  >
    <li
      v-for="category in menu"
      :key="category.id"
      class="
      whitespace-nowrap
      bg-blue-500
      text-white
      rounded-lg
      text-sm
      px-4
      py-2
      cursor-pointer
      hover:bg-blue-600
    "
    >
      <a :href="`#${formatName(category.name)}`">{{ category.name }}</a>
    </li>
  </ul>
  <div
    v-for="category in menu"
    :id="formatName(category.name)"
    :key="category.id"
    class="
    pt-20
    w-11/12
    mx-auto
    flex
    text-md
    flex-col
  "
  >
    <h3
      class="
    text-2xl
    font-bold
    mb-5
  "
    >
      {{ category.name }}
    </h3>

    <ul
      v-for="product in category.products"
      :key="product.id"
    >
      <li

        class="border-b py-5"
      >
        <div
          class="
    flex
    justify-between
  "
        >
          <span>{{ product.name }}</span>
          <span>&#8364{{ product.price }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
::-webkit-scrollbar {
  display: none;
}

* {
  scrollbar-width: none;
}
</style>
