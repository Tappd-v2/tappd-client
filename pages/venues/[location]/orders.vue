<template>
   <div>
      <section v-if="!showErrorMessage" class="m-10">
         <StaffNavigation />
         <ul>
            <li v-for="(order, id) in orders" :key="id">
               <h2>Order ID: {{ id }}</h2>
               <p>Created At: {{ order.created_at }}</p>
               <p>Total Amount: {{ order.total_amount }}</p>
               <p>Table: {{ order.table }}</p>
               <p>State: {{ order.state }}</p>
               <ul>
                  <li v-for="item in order.items" :key="item.name">
                     {{ item.name }} - {{ item.amount }}
                  </li>
               </ul>
            </li>
         </ul>
      </section>
      <ErrorMessage
         v-else
         class="m-10"
         error-message="You do not have permission to view this page"
      />
   </div>
</template>

<script setup>
import { ref, watchEffect } from "vue";
import { useUserStore } from "~/stores/user";
import { useApi } from "~/composables/useApi";
const route = useRoute();
const { apiGet } = useApi();

const userStore = useUserStore();
const location = route.params.location;
const showErrorMessage = ref(false);
const orders = await getOrders();

async function getOrders() {
   const orders = await apiGet(`orders`);
   return orders.reduce((acc, order) => {
      if (!acc[order.id]) {
         acc[order.id] = {
            created_at: formatDate(order.createdAt),
            total_amount: parseFloat(order.totalPrice),
            table: order.table,
            state: order.state,
            items: [],
         };
      }
      acc[order.id].items.push({
         name: order.items,
         amount: parseInt(order.amount, 10),
      });
      return acc;
   }, {});
}

function formatDate(date) {
   return new Date(date).toLocaleString("nl-BE", {
      hour: "numeric",
      minute: "numeric",
   });
}

watchEffect(() => {
   if (!userStore.permissions || !userStore.permissions.orgCode) {
      showErrorMessage.value = true;
   } else {
      showErrorMessage.value = userStore.permissions.orgCode !== location;
   }
});
</script>
