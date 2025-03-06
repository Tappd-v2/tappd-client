<template>
   <div
      class="mx-auto flex h-full flex-col justify-center sm:w-11/12 md:w-9/12"
   >
      <h1 class="mt-10 mb-5 text-center text-4xl font-bold text-black">
         Welkom bij Tappd
      </h1>

      <p>
         Tappd is een app waarmee je eenvoudig drankjes kunt bestellen bij jouw
         favoriete horecazaak.
      </p>

      <p class="mt-5 mb-1">Kies een locatie en begin met bestellen!</p>

      <Select
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
