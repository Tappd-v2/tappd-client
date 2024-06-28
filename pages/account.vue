<template>
   <div class="flex w-full flex-col items-center justify-between p-4">
      <p>
         Welcome, {{ userStore.user ? userStore.user.name : "Not logged in" }}
      </p>
      <p>Your ordered {{ itemCount }} items for a total of €{{ total }}.</p>
   </div>
</template>

<script setup>
import { useUserStore } from "~/stores/user";
import { useApi } from "~/composables/useApi";

const userStore = useUserStore();
const { apiGet } = useApi();
const itemCount = ref(0);
const total = ref(0);

onMounted(() => {
   getOrders();
});

async function getOrders() {
   try {
      const orders = await apiGet("orders?userId=" + userStore.user.id);
      console.log(orders);
      itemCount.value = orders.length;
      total.value = orders.reduce(
         (acc, order) => acc + parseFloat(order.totalPrice),
         0,
      );
   } catch (error) {
      console.error(error);
   }
}
</script>
