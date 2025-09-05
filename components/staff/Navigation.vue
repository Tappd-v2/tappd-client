<template>
   <nav class="mx-auto mt-10 w-11/12">
      <ul class="flex justify-between gap-5">
         <li class="flex-grow">
            <NuxtLink
               :to="`/venues/${route.params.location}/orders`"
               class="inline-block w-full rounded border px-4 py-2 text-center"
               :class="currentPage === 'orders' ? 'bg-blue-500 text-white' : ''"
               >Bestellingen</NuxtLink
            >
         </li>
         <li class="flex-grow">
            <NuxtLink
               :to="`/venues/${route.params.location}/menu`"
               class="inline-block w-full rounded border px-4 py-2 text-center"
               :class="
                  currentPage === 'menu'
                     ? 'bg-blue-500 text-white'
                     : 'bg-gray-200 text-black'
               "
               >Menu</NuxtLink
            >
         </li>
      </ul>
   </nav>
</template>

<script setup>
import { useRoute } from "vue-router";

const route = useRoute();

const currentPage = route.path.split("/").pop();
</script>
