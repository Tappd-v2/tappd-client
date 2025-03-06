<template>
   <Drawer v-model:visible="visible" header="Tappd">
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
</template>

<script setup>
import { useUserStore } from "~/stores/user";

const config = useRuntimeConfig();

const apiUrl = config.public.apiBaseUrl;

const userStore = useUserStore();

watchEffect(() => userStore.user);

const visible = ref(true);

console.console.log("visible", visible);
</script>

<style scoped>
li {
   border-bottom: 1px solid #ccc;
   padding: 0.5rem 0;
}

.bold {
   font-weight: bold;
}
</style>
