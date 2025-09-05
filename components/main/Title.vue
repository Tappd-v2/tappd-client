<script setup>
defineProps({
   title: {
      type: String,
      required: true,
   },
});
</script>

<template>
   <h1 class="mt-10 text-2xl font-bold">
      {{ title }}
   </h1>
   <div class="separator my-3 w-full bg-gray-300" />
</template>

<style scoped>
.separator {
   height: 1px;
}
</style>
