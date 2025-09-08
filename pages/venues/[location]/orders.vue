<template>
   <div class="min-h-screen bg-gray-50">
      <!-- Loading state -->
      <div v-if="isLoadingUser" class="flex justify-center items-center min-h-screen">
         <ProgressSpinner
            style="width: 50px; height: 50px"
            stroke-width="8"
            fill="transparent"
            animation-duration=".5s"
            aria-label="Custom ProgressSpinner"
         />
      </div>
      
      <!-- Main content -->
      <section v-else-if="!showErrorMessage">
         <StaffNavigation v-if="!isFullscreen" />
         <div class="mx-auto mt-8 w-11/12 flex items-center justify-between flex-wrap gap-4">
            <OrderStatusLegend  />
            
            <button
               class="md:ml-4 w-full md:w-auto inline-flex items-center px-3 py-2 bg-white border rounded shadow text-sm text-gray-700 hover:bg-gray-50"
               @click="() => toggleFullscreen()"
               aria-label="Toggle fullscreen orders"
            >
               <i :class="fullscreenIconClass" class="mr-2"></i>
               <span v-if="isFullscreen">Verlaat volledig scherm</span>
               <span v-else>Volledig scherm</span>
            </button>
         </div>

         <!-- ORDERS -->
         <div class="mx-auto w-11/12">
            <div class="mt-4 border-t border-gray-300 pt-8">
               <div v-if="orders.length === 0 && tableRequests.length === 0" class="text-center py-12">
                  <div class="text-gray-400 mb-4">
                     <i class="fas fa-receipt text-6xl"></i>
                  </div>
                  <h3 class="text-xl font-semibold text-gray-600 mb-2">
                     Geen bestellingen of tafeloproepen
                  </h3>
                  <p class="text-gray-500">
                     Er zijn momenteel geen bestellingen of tafeloproepen. Nieuwe items verschijnen hier automatisch.
                  </p>
               </div>
        
               <TableRequestCard
                  v-for="req in tableRequests"
                  :key="req.id"
                  :request="req"
                  @toggle-state="toggleTableRequestState"
               />
               
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
      
      <!-- Error state -->
      <ErrorMessage
         v-else
         class="m-10"
         error-message="You do not have permission to view this page"
      />
   </div>
</template>

<script setup>
import { ref, watchEffect, onMounted, computed } from "vue";
import { useUserStore } from "~/stores/user";
import { useOrdersApi } from "~/composables/useOrdersApi";
import { useOrdersWebSocket } from "~/composables/useOrdersWebSocket";
import { getOrderStatusClass, applyOrderUpdate } from "~/utils/orderHelpers";
import TableRequestCard from '~/components/TableRequestCard.vue'

// Composables and stores
const route = useRoute();
const userStore = useUserStore();
const location = route.params.location;

// Local state
const showErrorMessage = ref(false);
const isLoadingUser = ref(true);

// Orders management
const { orders, fetchOrders, updateOrderState, fetchTableRequest, tableRequests, updateTableRequestState } = useOrdersApi(location);

// WebSocket for real-time updates
function handleOrderUpdate(orderData, messageType) {
   const isNewOrder = messageType === 'order_created'
   // If this is a call (call_created/call_updated) the messageType will start with 'call'
   if (messageType && messageType.startsWith('call')) {
      // Mark new table requests coming from WS so UI can animate
      const req = Object.assign({}, orderData)
      if (messageType === 'call_created') req.isNewFromWs = true
      tableRequests.value = applyOrderUpdate(tableRequests.value, req, messageType === 'call_created')
   } else {
      orders.value = applyOrderUpdate(orders.value, orderData, isNewOrder)
   }
}

const { connect: connectWebSocket } = useOrdersWebSocket(location, handleOrderUpdate);

// Fullscreen layout state (global)
const layout = useState('layout');

const isFullscreen = computed(() => layout.value === 'orders-fullscreen');
const fullscreenIconClass = computed(() => isFullscreen.value ? 'fas fa-compress' : 'fas fa-expand');

function toggleFullscreen() {
   layout.value = isFullscreen.value ? 'default' : 'orders-fullscreen';
}

// Event handlers
async function toggleOrderState(order) {
   await updateOrderState(order);
}

async function toggleTableRequestState(request) {
   await updateTableRequestState(request);
}

// Permission check
watchEffect(() => {
   if (!userStore.permissions || !userStore.permissions.orgCode) {
      isLoadingUser.value = true;
      showErrorMessage.value = false;
   } else if(userStore.permissions.orgCode !== location) {
      showErrorMessage.value = true;
      isLoadingUser.value = false;
   } else {
      showErrorMessage.value = false;
      isLoadingUser.value = false;
   }
});

// Initialize on mount
onMounted(async () => {
   await fetchOrders();
   await fetchTableRequest();
   connectWebSocket();
});

// SEO
useHead({
   title: "Bestellingen | Tappd - Eenvoudig Bestellen",
});
</script>