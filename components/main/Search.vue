<script setup>
import { defineProps, watch } from 'vue'

const props = defineProps({
  filterItems: {
    type: Function,
    required: true,
  },
})

const search = ref('')

watch(() => search, () => {
  props.filterItems(search)
})
</script>

<template>
  <IconField icon-position="left" unstyled class="w-11/12 mx-auto mt-10 bg-white flex items-center px-3 rounded">
    <InputIcon class="pi pi-search  text-gray-500" />
    <InputText v-model="search" placeholder="Search" unstyled class="border-0 flex-grow focus:outline-none" />
  </IconField>
</template>

<style scoped>
::-webkit-scrollbar {
  display: none;
}

* {
  scrollbar-width: none;
}
</style>
