<template>
   <div class="min-h-screen bg-gray-50">
      <section v-if="!showErrorMessage">
         <StaffNavigation />
         <div class="mx-auto mt-8 w-11/12">
            <OrderStatusLegend />
         </div>

         <div class="mx-auto mt-3 w-11/12 text-sm text-gray-600">
            Tik op een bestelling om deze naar de volgende status te zetten.
         </div>

         <!-- ORDERS -->
         <div class="mx-auto w-11/12">
            <div class="mt-4 border-t border-gray-300 pt-8">
               <OrderCard
                  v-for="order in orders"
                  :key="order.id"
                  :order="order"
                  @toggle-state="toggleOrderState"
                  @toggle-expand="(order) => order.expanded = !order.expanded"
               />
            </div>
         </div>
      </section>
      <ErrorMessage
         v-else
         class="m-10"
         error-message="You do not have permission to view this page"
      />
   </div>
</template>

<script setup>
import { ref, watchEffect, onMounted } from "vue";
import { useUserStore } from "~/stores/user";
import { useOrdersApi } from "~/composables/useOrdersApi";
import { useOrdersWebSocket } from "~/composables/useOrdersWebSocket";
import { getOrderStatusClass, applyOrderUpdate } from "~/utils/orderHelpers";

// Composables and stores
const route = useRoute();
const userStore = useUserStore();
const location = route.params.location;

// Local state
const showErrorMessage = ref(false);

// Orders management
const { orders, fetchOrders, updateOrderState } = useOrdersApi(location);

// WebSocket for real-time updates
function handleOrderUpdate(orderData, messageType) {
   const isNewOrder = messageType === 'order_created';
   orders.value = applyOrderUpdate(orders.value, orderData, isNewOrder);
}

const { connect: connectWebSocket } = useOrdersWebSocket(location, handleOrderUpdate);

// Event handlers
async function toggleOrderState(order) {
   await updateOrderState(order);
}

// Permission check
watchEffect(() => {
   if (!userStore.permissions || !userStore.permissions.orgCode) {
      showErrorMessage.value = true;
   } else {
      showErrorMessage.value = userStore.permissions.orgCode !== location;
   }
});

// Initialize on mount
onMounted(async () => {
   await fetchOrders();
   connectWebSocket();
});

// SEO
useHead({
   title: "Bestellingen | Tappd - Eenvoudig Bestellen",
});
</script>

<style scoped>
/* Minimal styles for page-specific layout only */
</style>
