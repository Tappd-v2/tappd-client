<script setup>
import { useUserStore } from "~/stores/user";
import { useApi } from "~/composables/useApi";

const { apiGet } = useApi();
const route = useRoute();
const userStore = useUserStore();

async function getLocation(locationId) {
   if (locationId) {
      const location = await apiGet(`locations/${locationId}`);
      if (!location) await navigateTo("/404");
   }
}

onMounted(async () => {
   getLocation(route.params.location);
   userStore.getCurrentUser();
});

watch(
   () => route.fullPath, // Watch for full path to capture all navigation changes
   async () => {
      await getLocation(route.params.location);
      await userStore.getCurrentUser(); // Refetch currentUser on navigation
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
