<template>
   <div class="mx-auto py-8 sm:w-11/12 md:w-9/12">
      <div class="mb-6 flex items-center justify-between">
         <h1 class="text-3xl font-bold text-gray-900">Locaties</h1>
      </div>

      <div v-if="locations.length" class="grid gap-4">
         <NuxtLink
            v-for="loc in locations"
            :key="loc.id"
            :to="`/venues/${loc.id}`"
            class="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-transform duration-200 hover:scale-105 hover:shadow-md"
         >
            <div>
               <div class="text-lg font-semibold text-gray-900">
                  {{ loc.name }}
               </div>
               <div v-if="loc.description" class="text-sm text-gray-600">
                  {{ loc.description }}
               </div>
            </div>
         </NuxtLink>
      </div>

      <div v-else class="py-16 text-center">
         <p class="mb-4 text-gray-600">Geen locaties gevonden.</p>
         <button
            class="rounded bg-gray-900 px-4 py-2 text-sm text-white hover:bg-gray-800"
            @click="getLocations"
         >
            Opnieuw proberen
         </button>
      </div>
   </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useApi } from "~/composables/useApi";

const { apiGet } = useApi();

const locations = ref([]);

onMounted(() => {
   getLocations();
});

async function getLocations() {
   try {
      locations.value = await apiGet("locations");
      console.log("Fetched locations:", locations.value);
   } catch (error) {
      console.error(error);
   }
}
</script>
