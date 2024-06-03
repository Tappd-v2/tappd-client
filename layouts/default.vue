<script setup>
import { useUserStore } from "~/stores/user";
import { useApi } from "~/composables/useApi";
import { useOrderStore } from "~/stores/order";

const { apiGet } = useApi();
const route = useRoute();
const userStore = useUserStore();
const orderStore = useOrderStore();
const credentials = {
   email: "user@example.com",
   password: "example",
};
async function getLocation(locationId) {
   if (locationId) {
      const location = await apiGet(`locations/${locationId}`);
      if (!location) await navigateTo("/404");

      orderStore.setLocation(location);
   }
}
userStore.login(credentials);

onMounted(async () => {
   getLocation(route.params.location);
});

watch(
   () => route.params.location,
   async (location) => {
      getLocation(location);
   },
);
</script>

<template>
   <div class="flex min-h-screen flex-col">
      <header>
         <MainHeader />
      </header>
      <main class="flex-1 bg-gray-100">
         <slot />
      </main>
   </div>
</template>
