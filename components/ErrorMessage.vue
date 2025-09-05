<template>
   <div
      class="relative rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700"
   >
      <strong class="font-bol2 mb-2 block">Error!</strong>
      <span class="block sm:inline">{{ errorMessage }}</span>
   </div>
</template>

<script setup>
defineProps({
   errorMessage: {
      type: String,
      required: true,
   },
});
</script>
