<template>
   <div class="sm:w-11/12 md:w-9/12 h-full mx-auto flex flex-col justify-center">
      <h1
         class="text-4xl text-center font-bold text-gray-800 mt-10 mb-5">
         Welkom bij Tappd
      </h1>
      <p>
         Tappd is een app waarmee je eenvoudig drankjes kunt bestellen bij jouw favoriete horecazaak.
      </p>

      <p class="mt-5 mb-1">
         Kies een locatie en begin met bestellen!
      </p>

      <Dropdown
         v-model="pickedLocation"
         input-id="dd-location"
         :options="locations"
         option-label="name"
         class="w-full text-black"
         placeholder="Kies een locatie"
      />
   </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useApi } from "~/composables/useApi";

const { apiGet } = useApi();

const locations = ref([]);
const $router = useRouter();
const pickedLocation = ref(null);

onMounted(() => {
   getLocations();
});

async function getLocations() {
   try {
      locations.value = await apiGet("locations");
   } catch (error) {
      console.error(error);
   }
}

watchEffect(() => {
   if (pickedLocation.value) {
      $router.push(`/venues/${pickedLocation.value.id}`);
   }
});
</script>

