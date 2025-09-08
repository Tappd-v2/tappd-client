<template>
   <div class="min-h-screen bg-gray-50">
      <section v-if="!showErrorMessage">
         <StaffNavigation />
         <div class="mx-auto mt-8 w-11/12">
            <div class="flex items-center gap-4 text-sm">
               <div class="flex items-center gap-2">
                  <span class="h-4 w-4 rounded-sm bg-blue-500" />
                  <span class="font-semibold text-gray-700">Nieuw</span>
               </div>
               <div class="flex items-center gap-2">
                  <span class="h-4 w-4 rounded-sm bg-orange-500" />
                  <span class="font-semibold text-gray-700"
                     >In behandeling</span
                  >
               </div>
               <div class="flex items-center gap-2">
                  <span class="h-4 w-4 rounded-sm bg-green-500" />
                  <span class="font-semibold text-gray-700">Afgerond</span>
               </div>
            </div>
         </div>

         <div class="mx-auto mt-3 w-11/12 text-sm text-gray-600">
            Tik op een bestelling om deze naar de volgende status te zetten.
         </div>

         <!-- ORDERS -->
         <div class="mx-auto w-11/12">
            <div class="mt-4 border-t border-gray-300 pt-8">
               <div
                  v-for="order in orders"
                  :key="order.id"
                  class="card-hover mb-4 overflow-hidden rounded-lg text-white"
                  :class="[
                     getOrderStatusClass(order.state, 'base'),
                     { 'bounce-new-order': order.isNewFromWs }
                  ]"
                  @click="toggleOrderState(order)"
               >
                  <div
                     class="fade-bg flex cursor-pointer items-center justify-between p-4"
                     :class="{ 'bg-opacity-90': order.expanded }"
                  >
                     <p class="flex items-center gap-2 text-lg font-bold">
                        {{ order.table.name }}
                        {{
                           order.customerName ? "- " + order.customerName : ""
                        }}
                     </p>
                     <div
                        class="text-lg transition-transform duration-300"
                        @click.stop="order.expanded = !order.expanded"
                     >
                        <i
                           :class="
                              order.expanded
                                 ? 'fas fa-minus-square text-white'
                                 : 'fas fa-plus-square pulse-icon text-white'
                           "
                        />
                     </div>
                  </div>
                  <!-- Order Details -->
                  <Transition name="slide">
                     <div v-if="order.expanded">
                        <div
                           class="p-4"
                           :class="getOrderStatusClass(order.state, 'dark')"
                        >
                           <!-- Items -->
                           <div
                              v-for="(item, index) in order.items"
                              :key="index"
                              class="flex items-center justify-between border-b border-gray-300 py-3"
                           >
                              <div class="flex gap-4">
                                 <span class="text-lg">{{ item.amount }}x</span>
                                 <span class="text-lg">{{ item.name }}</span>
                              </div>
                              <div class="text-lg">€{{ item.price }}</div>
                           </div>
                           <!-- Total -->
                           <div class="flex items-center justify-end py-4">
                              <div class="text-xl font-bold">
                                 €{{ order.totalPrice }}
                              </div>
                           </div>
                        </div>
                        <!-- Remarks -->
                        <div
                           v-if="order.remarks"
                           class="rounded p-4"
                           :class="getOrderStatusClass(order.state, 'brighter')"
                        >
                           <div class="mb-1 text-lg font-bold text-white">
                              OPMERKING
                           </div>
                           <div class="text-lg text-white">
                              {{ order.remarks }}
                           </div>
                        </div>
                     </div>
                  </Transition>
               </div>
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
import { ref, watchEffect, onMounted, onBeforeUnmount } from "vue";
import { useUserStore } from "~/stores/user";
import { useApi } from "~/composables/useApi";

const route = useRoute();
const { apiGet, apiPatch } = useApi();
const userStore = useUserStore();
const location = route.params.location;
const showErrorMessage = ref(false);
const orders = ref([]);

// helper: sort orders so 'fulfilled' are at the bottom
function sortOrders(list) {
   const priority = { new: 0, pending: 1, fulfilled: 2 };
   return [...list].sort(
      (a, b) => (priority[a.state] ?? 99) - (priority[b.state] ?? 99),
   );
}

async function getOrders() {
   try {
      const response = await apiGet(`orders?locationId=${location}`);
      const mapped = response.map((order) => ({
         ...order,
         expanded: order.state === "new" || order.state === "pending",
      }));

      return sortOrders(mapped);
   } catch (error) {
      console.error("Failed to fetch orders:", error);
      return [];
   }
}

async function initializeOrders() {
   orders.value = await getOrders();
}

async function toggleOrderState(order) {
   const states = ["new", "pending", "fulfilled"];
   const currentIndex = states.indexOf(order.state);
   const nextIndex = (currentIndex + 1) % states.length;
   const newState = states[nextIndex];

   try {
      const response = await apiPatch(`orders/${order.id}/state`, {
         state: newState,
      });

      if (response && !response.unauthorized) {
         order.state = newState;
         order.expanded = order.state === "new" || order.state === "pending";
         // after changing a state, re-sort so fulfilled orders move to the bottom
         orders.value = sortOrders(orders.value);
      } else {
         console.error("Failed to update order state");
      }
   } catch (error) {
      console.error("Error updating order state:", error);
   }
}

// Get CSS class based on order status
function getOrderStatusClass(state, variant = "base") {
   const colors = {
      new: {
         base: "bg-blue-500",
         dark: "bg-blue-600",
         brighter: "bg-blue-400",
      },
      pending: {
         base: "bg-orange-500",
         dark: "bg-orange-600",
         brighter: "bg-orange-400",
      },
      fulfilled: {
         base: "bg-green-500",
         dark: "bg-green-600",
         brighter: "bg-green-400",
      },
   };
   return colors[state]?.[variant] || colors.new.base;
}

// Initialize
onMounted(() => {
   // initial fetch + start periodic polling
   initializeOrders();

   // open websocket
   connectWs();
});

onBeforeUnmount(() => {
   if (ws.value) {
      try { ws.value.close(); } catch (e) {}
      ws.value = null;
   }
   if (reconnectTimeout.value) {
      clearTimeout(reconnectTimeout.value);
      reconnectTimeout.value = null;
   }
});

function applyIncomingOrder(orderData) {
   // if order exists, update it; otherwise add to list
   const idx = orders.value.findIndex((o) => o.id === orderData.id);
   if (idx !== -1) {
      // merge
      orders.value[idx] = { ...orders.value[idx], ...orderData, items: orderData.items || orders.value[idx].items };
   } else {
      // new orders: expand by default for new/pending and add bounce animation
      const mapped = { 
         ...orderData, 
         expanded: orderData.state === 'new' || orderData.state === 'pending', 
         items: orderData.items || [],
         isNewFromWs: true
      };
      orders.value.unshift(mapped);
      orders.value = sortOrders(orders.value);
      
      // Remove bounce animation after 3 seconds
      setTimeout(() => {
         const order = orders.value.find(o => o.id === orderData.id);
         if (order) {
            order.isNewFromWs = false;
         }
      }, 3000);
   }
}

const ws = ref(null);
const reconnectTimeout = ref(null);
const wsUrl = () => {
   // Connect to backend WebSocket server on port 3030 (matches backend)
   return `ws://localhost:3030/ws`;
};


function connectWs() {
   try {
      const socket = new WebSocket(wsUrl());
      ws.value = socket;

      socket.onopen = () => {
         try {
            socket.send(JSON.stringify({ locationId: location }));
         } catch (err) {
            console.error('Failed to send locationId over ws', err);
         }
      };

      socket.onmessage = (e) => {
         try {
            const msg = JSON.parse(e.data);
            if (msg.type === 'order_created') {
               applyIncomingOrder(msg.order);
            } else if (msg.type === 'order_updated') {
               applyIncomingOrder({ order: msg.order, items: msg.items });
            }
         } catch (err) {
            console.error('Failed to handle ws message', err);
         }
      };

      socket.onclose = () => {
         console.warn('Orders websocket closed, reconnecting in 2s');
         ws.value = null;
         reconnectTimeout.value = window.setTimeout(() => connectWs(), 2000);
      };

      socket.onerror = (err) => {
         console.error('Orders websocket error', err);
         try { socket.close(); } catch (e) {}
      };
   } catch (err) {
      console.error('Failed to connect websocket', err);
      reconnectTimeout.value = window.setTimeout(() => connectWs(), 2000);
   }
}

watchEffect(() => {
   if (!userStore.permissions || !userStore.permissions.orgCode) {
      showErrorMessage.value = true;
   } else {
      showErrorMessage.value = userStore.permissions.orgCode !== location;
   }
});

useHead({
   title: "Bestellingen | Tappd - Eenvoudig Bestellen",
});
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
   transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
   overflow: hidden;
}

.slide-enter-from {
   transform: translateY(-10px);
   opacity: 0;
   max-height: 0;
}

.slide-leave-to {
   transform: translateY(-10px);
   opacity: 0;
   max-height: 0;
}

.slide-enter-to,
.slide-leave-from {
   max-height: 1000px;
   opacity: 1;
   transform: translateY(0);
}

.card-hover {
   transition: transform 0.2s ease;
}

.card-hover:hover {
   transform: translateY(-2px);
   box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.pulse-icon {
   animation: pulse 1.5s infinite;
}

@keyframes pulse {
   0% {
      transform: scale(1);
   }
   50% {
      transform: scale(1.1);
   }
   100% {
      transform: scale(1);
   }
}

.fade-bg {
   transition: background-color 0.3s ease;
}

@keyframes bounceNewOrder {
   0% {
      transform: translateY(0) scale(1);
   }
   15% {
      transform: translateY(-8px) scale(1.03);
   }
   30% {
      transform: translateY(0) scale(1);
   }
   45% {
      transform: translateY(-4px) scale(1.01);
   }
   60% {
      transform: translateY(0) scale(1);
   }
   75% {
      transform: translateY(-2px) scale(1.005);
   }
   100% {
      transform: translateY(0) scale(1);
   }
}

.bounce-new-order {
   animation: bounceNewOrder 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
</style>
