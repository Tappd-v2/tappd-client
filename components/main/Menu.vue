<script setup>
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

const selectedItem = ref(null)

function selectItem(item) {
  selectedItem.value = null // Reset the selectedItem
  // Use nextTick to ensure the DOM updates before setting the new item
  nextTick(() => {
    selectedItem.value = item
  })
}
</script>

<template>
  <div
    v-for="category in menu"
    :id="formatName(category.name)"
    :key="category.id"
    class="
    w-11/12
    pt-10
    pb-5
    mx-auto
    flex
    text-md
    flex-col"
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
      @click="selectItem(product)"
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
          <span>&#8364;{{ product.price }}</span>
        </div>
      </li>
    </ul>
  </div>
  <MainItemDetail :item="selectedItem" :store="store" />
</template>
