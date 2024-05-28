<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  filterItems: {
    type: Function,
    required: true,
  },
})

const search = ref('')

watch(search, (value) => {
  props.filterItems(value)
})
</script>

<template>
  <IconField icon-position="left" unstyled class="w-11/12 mx-auto mt-10 bg-white flex items-center px-3 rounded py-2">
    <InputIcon class="pi pi-search  text-gray-500 mr-3" />
    <InputText v-model="search" placeholder="Zoeken" unstyled class="border-0 flex-grow focus:outline-none" />
  </IconField>
</template>
