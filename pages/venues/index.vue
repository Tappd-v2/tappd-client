<script setup>
import { ref } from "vue";

const venues = ref([
   { id: 1, name: "Plectrum" },
   { id: 2, name: "Pizza hut" },
]);
</script>

<template>
   <div class="mt-10 flex h-screen flex-col items-center">
      <h1 class="text-4xl font-bold">Venues</h1>
      <ul class="mt-4">
         <li
            v-for="venue in venues"
            :key="venue.id"
            class="border-b border-gray-300 py-2 text-lg"
         >
            <nuxt-link :to="`/venues/${venue.id}`">
               {{ venue.name }}
            </nuxt-link>
         </li>
      </ul>
   </div>
</template>
