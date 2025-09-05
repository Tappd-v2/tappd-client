<script setup>
defineProps({
   menu: {
      type: Array,
      required: true,
   },
});
</script>

<template>
   <ul class="mx-auto mt-5 mb-5 flex w-11/12 gap-5 overflow-x-auto">
      <li v-for="category in menu" :key="category.id">
         <a
            class="inline-block cursor-pointer rounded-lg bg-blue-500 px-4 py-2 text-sm whitespace-nowrap text-white hover:bg-blue-600"
            :href="`#${formatName(category.name)}`"
         >
            {{ category.name }}
         </a>
      </li>
   </ul>
</template>

<style scoped>
::-webkit-scrollbar {
   display: none;
}

* {
   scrollbar-width: none;
}
</style>
