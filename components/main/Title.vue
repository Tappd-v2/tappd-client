<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <h1 class="text-2xl font-bold mt-10 ">
    {{ title }}
  </h1>
  <div class="separator bg-gray-300 w-full my-3" />
</template>

<style scoped>
.separator {
  height: 1px;
}
</style>
