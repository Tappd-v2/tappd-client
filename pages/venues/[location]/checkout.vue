<script setup>
import { useOrderStore } from "~/stores/order";

const orderStore = useOrderStore();
const route = useRoute();
</script>

<template>
   <div>
      <div class="mx-auto w-9/12 h-svh" >
         <MainTitle title="Bestelling afronden" />
         <div class="my-10">
            <FormTablePicker />
         </div>
         <div class="my-10">
               <Textarea
                  v-model="orderStore.remarks"
                  rows="5"
                  cols="30"
                  class="w-full p-2"
                  placeholder="Voer hier je opmerkingen in"
               />
         </div>
         <NuxtLink
            :to="`/venues/${route.params.location}/menu`"
            class="block rounded bg-gray-200 px-5 py-2 text-center"
         >
            Terug naar menu
         </NuxtLink>
      </div>
      <OrderSummary v-if="orderStore.items.length > 0" :final-step="true" />

      <MainItemDetail />
   </div>
</template>
