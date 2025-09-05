<template>
   <div class="mx-auto w-11/12 max-w-4xl py-8">
      <h1 class="mb-6 text-2xl font-bold">
         Welkom, {{ userStore.user ? userStore.user.name : "Not logged in" }}
      </h1>

      <div v-if="orders.length > 0" class="space-y-4">
         <div
            v-for="order in orders"
            :key="order.id"
            class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
         >
            <div
               class="mb-3 flex justify-between border-b border-gray-100 pb-2"
            >
               <div>
                  <p class="text-sm text-gray-600">
                     Bestelling #{{ order.id }}
                  </p>
                  <p class="text-sm text-gray-600">
                     {{ formatDate(order.createdAt) }}
                  </p>
               </div>
               <div class="flex items-center gap-4">
                  <a
                     class="flex cursor-pointer items-center gap-2 rounded-md bg-blue-50 px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-100"
                     :href="order.receiptUrl"
                     target="_blank"
                  >
                     <i class="fas fa-receipt" />
                     Bonnetje
                  </a>
                  <p class="font-semibold">
                     €{{ parseFloat(order.totalPrice).toFixed(2) }}
                  </p>
               </div>
            </div>
            <div class="space-y-2">
               <div
                  v-for="item in order.items"
                  :key="item.id"
                  class="flex justify-between text-sm"
               >
                  <span>{{ item.amount }}x {{ item.name }}</span>
                  <span>€{{ (item.price * item.amount).toFixed(2) }}</span>
               </div>
            </div>
         </div>
      </div>

      <div v-else class="mt-8 text-center text-gray-500">
         Geen bestellingen gevonden
      </div>
   </div>
</template>

<script setup>
import { useUserStore } from "~/stores/user";
import { useApi } from "~/composables/useApi";

const userStore = useUserStore();
const { apiGet } = useApi();
const orders = ref([]);

onMounted(() => {
   if (!userStore.user) return;
   getOrders();
});

watchEffect(() => {
   if (userStore.user) getOrders();
});

function formatDate(date) {
   return new Date(date).toLocaleString("nl-BE", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
   });
}

async function getOrders() {
   try {
      const response = await apiGet("orders?userId=" + userStore.user.id);
      orders.value = response;
   } catch (error) {
      console.error(error);
   }
}

useHead({
   title: "Account | Tappd - Eenvoudig Bestellen",
});
</script>
