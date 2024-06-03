<script setup>
import { ref, watch } from "vue";

const props = defineProps({
   filterItems: {
      type: Function,
      required: true,
   },
});

const search = ref("");

watch(search, (value) => {
   props.filterItems(value);
});
</script>

<template>
   <IconField
      icon-position="left"
      unstyled
      class="mx-auto mt-10 flex w-11/12 items-center rounded bg-white px-3 py-2"
   >
      <InputIcon class="pi pi-search mr-3 text-gray-500" />
      <InputText
         v-model="search"
         placeholder="Zoeken"
         unstyled
         class="flex-grow border-0 focus:outline-none"
      />
   </IconField>
</template>
