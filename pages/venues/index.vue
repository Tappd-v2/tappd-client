<script setup>
import { ref } from 'vue'

const venues = ref([
  { id: 1, name: 'Plectrum' },
  { id: 2, name: 'Pizza hut' },
])
</script>

<template>
  <div class="flex flex-col items-center h-screen mt-10">
    <h1 class="text-4xl font-bold">
      Venues
    </h1>
    <ul class="mt-4">
      <li v-for="venue in venues" :key="venue.id" class="text-lg border-b border-gray-300 py-2">
        <nuxt-link :to="`/venues/${venue.id}`">
          {{ venue.name }}
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>
