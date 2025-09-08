<script setup>
import { useOrderStore } from "~/stores/order";
import { ref } from 'vue';

const orderStore = useOrderStore();
const route = useRoute();
const checkoutError = ref(null);

useHead({
   title: "Checkout | Tappd - Eenvoudig Bestellen",
});

function onCheckoutError(msg) {
   checkoutError.value = msg;
}
</script>

<template>
   <div>
      <div class="mx-auto h-svh w-9/12">
         <div v-if="checkoutError" class="my-4 rounded border border-red-200 bg-red-50 p-4 text-red-800 shadow-sm">
            <div class="flex items-start justify-between">
               <div>
                  <strong class="block text-sm">Fout bij het uitchecken</strong>
                  <p class="mt-1 text-sm">{{ checkoutError }}</p>
               </div>
            </div>
         </div>
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
            class="block rounded bg-gray-200 px-5 py-2 text-center transition-colors duration-500 hover:bg-gray-300"
         >
            Terug naar menu
         </NuxtLink>
      </div>
      <OrderSummary v-if="orderStore.items.length > 0" :final-step="true" @checkout-error="onCheckoutError" />

       <MainItemDetail />
   </div>
</template>
