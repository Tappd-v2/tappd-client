<script setup>
import { ref } from "vue";

const search = ref("");

const emit = defineEmits(["search"]);

const onSearch = (e) => {
   emit("search", e.target.value);
};
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
         @input="onSearch"
      />
   </IconField>
</template>
