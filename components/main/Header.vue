<script setup>
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useApi } from "~/composables/useApi";
import { useUserStore } from "~/stores/user";

const route = useRoute();
const { getLocationName } = useApi();
const title = ref("Tappd");

async function getTitle() {
   if (route.path.includes("/venues/")) {
      return `Tappd - ${await getLocationName(route.params.location)}`;
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
