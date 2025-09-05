<script setup>
import { onMounted, ref, watch, watchEffect } from "vue";
import { useRoute } from "vue-router";
import { useApi } from "~/composables/useApi";
import { useUserStore } from "~/stores/user";

const route = useRoute();
const { getLocationName } = useApi();
const title = ref("Tappd");

function isSpecificVenueRoute(path) {
   // matches exactly /venues/{id} with a single segment after /venues
   return /^\/venues\/[^/]+$/.test(path);
}

async function getTitle() {
   // only load name for exact /venues/{ID} routes
   if (isSpecificVenueRoute(route.path)) {
      // try common param names, fallback to the segment in the path
      const id =
         route.params.location || route.params.id || route.path.split("/")[2];
      if (id) {
         return `Tappd - ${await getLocationName(id)}`;
      }
   }
   return "Tappd";
}

onMounted(async () => {
   title.value = await getTitle();
});

const isVisible = ref(false);

const showSidebar = () => {
   isVisible.value = !isVisible.value;
};

watch(
   () => route.fullPath,
   async () => {
      title.value = await getTitle();
   },
);

const config = useRuntimeConfig();

const apiUrl = config.public.apiBaseUrl;

const userStore = useUserStore();

watchEffect(() => userStore.user);

useHead({
   title: "Locaties | Tappd - Eenvoudig Bestellen",
});
</script>

<template>
   <div class="hero">
      <MenuButton class="bg-transparent" @click="showSidebar" />
      <Drawer v-model:visible="isVisible" header="Tappd">
         <nav>
            <ul class="flex flex-col gap-4 p-4">
               <li>
                  <NuxtLink to="/" active-class="bold">Over Tappd</NuxtLink>
               </li>
               <li>
                  <NuxtLink to="/venues" active-class="bold">Locaties</NuxtLink>
               </li>
               <li v-if="userStore.user">
                  <NuxtLink to="/account" active-class="bold"
                     >Mijn account</NuxtLink
                  >
               </li>
               <li v-if="userStore.user">
                  <a
                     class="cursor-pointer"
                     :href="`${apiUrl}/logout`"
                     @click="userStore.logout()"
                     >Log out</a
                  >
               </li>
               <li v-if="!userStore.user">
                  <a class="cursor-pointer" :href="`${apiUrl}/login`"
                     >Aanmelden</a
                  >
               </li>
               <li v-if="!userStore.user">
                  <a class="cursor-pointer" :href="`${apiUrl}/register`"
                     >Registreren</a
                  >
               </li>
            </ul>
         </nav>
      </Drawer>
      <div class="p-3">
         <div class="text-center">
            <h1 class="text-center text-5xl">{{ title }}</h1>
            <p class="text-xl">Eenvoudig Bestellen</p>
         </div>
      </div>
   </div>
</template>

<style scoped>
.hero {
   background-image: url("~/assets/images/hero.png");
   background-position: center;
   background-size: cover;
   color: white;
   padding: 1rem;
   font-family: "Staatliches", cursive;
}

li {
   border-bottom: 1px solid #ccc;
   padding: 0.5rem 0;
}

.bold {
   font-weight: bold;
}
</style>
