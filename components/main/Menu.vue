<script setup>
import { useOrderStore } from '~/stores/order'

defineProps({
  menu: {
    type: Array,
    required: true,
  },
  store: {
    type: Object,
    required: true,
  },
})

const orderStore = useOrderStore()

function selectItem(item) {
  orderStore.unsetSelectedItem()
  // Use nextTick to ensure the DOM updates before setting the new item
  nextTick(() => {
    orderStore.setSelectedItem(item)
  })
}
</script>

<template>
  <div
    v-for="category in menu"
    :id="formatName(category.name)"
    :key="category.id"
    class="w-11/12 pt-5 pb-10 mx-auto flex text-md flex-col"
  >
    <h3 class="text-2xl font-bold mb-5">
      {{ category.name }}
    </h3>

    <ul
      v-for="items in category.items"
      :key="items.id"
      @click="selectItem(items)"
    >
      <li class="border-b py-5">
        <div class="flex justify-between">
          <span>{{ items.name }}</span>
          <span>&#8364;{{ items.price }}</span>
        </div>
      </li>
    </ul>
  </div>
  <MainItemDetail />
</template>
