<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useApi } from "~/composables/useApi";
import { useUserStore } from "~/stores/user";

const route = useRoute();
const { getLocationName } = useApi();
const title = ref("");

async function getTitle() {
   if (route.path === "/" || route.path === "/account") return "Tappd";
   return `Tappd - ${await getLocationName(route.params.location)}`;
}

onMounted(async () => {
   title.value = await getTitle();
});

const isVisible = ref(false);

const showSidebar = () => {
   isVisible.value = !isVisible.value;
};

watchEffect(
   () => route.params.location,
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
                  <NuxtLink to="/" active-class="bold">Locaties</NuxtLink>
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
                     target="_blank"
                     @click="userStore.logout()"
                     >Log out</a
                  >
               </li>
               <li v-if="!userStore.user">
                  <a class="cursor-pointer" :href="`${apiUrl}/login`">Log in</a>
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
