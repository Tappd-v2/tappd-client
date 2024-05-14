<script setup>
defineProps({
  menu: {
    type: Array,
    required: true,
  },
})
</script>

<template>
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
