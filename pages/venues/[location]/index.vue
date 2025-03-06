<script setup>
import { useOrderStore } from "~/stores/order";
import { useApi } from "~/composables/useApi";

const orderStore = useOrderStore();
const title = ref("");
const route = useRoute();
const { getLocationName } = useApi();

useHead({
   title: "Welcome",
});

onMounted(async () => {
   title.value = `Welkom bij ${await getLocationName(route.params.location)}`;
});

watchEffect(
   () => route.params.location,
   async () => {
      title.value = `Welkom bij ${await getLocationName(route.params.location)}`;
   },
);
</script>

<template>
   <section class="mx-auto w-9/12">
      <MainTitle :title="title" />

      <div
         class="mt-32 flex w-full flex-col items-center justify-center gap-10"
      >
         <NuxtLink
            :to="`/venues/${route.params.location}/menu`"
            class="block w-full rounded bg-blue-500 px-5 py-5 text-center text-white"
         >
            Bestel Online
         </NuxtLink>
         <div class="flex w-full items-center justify-center gap-5">
            <span class="divider" />
            <p class="font-bold text-gray-400">of</p>
            <span class="divider" />
         </div>
         <NuxtLink
            :to="`/venues/${route.params.location}/call`"
            class="block w-full rounded bg-gray-200 px-5 py-5 text-center"
         >
            Roep personeel
         </NuxtLink>
      </div>
   </section>
</template>

<style scoped>
.divider {
   display: block;
   width: 100%;
   height: 1px;
   background-color: #bebebe;
   margin: 1rem 0;
}
</style>
