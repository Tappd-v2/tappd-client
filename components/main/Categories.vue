<script setup>
defineProps({
  menu: {
    type: Array,
    required: true,
  },
})
</script>

<template>
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
</template>
