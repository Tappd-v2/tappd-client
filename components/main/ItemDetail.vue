<script setup>
import { ref, watch, computed, nextTick, watchEffect } from "vue";

import { useOrderStore } from "~/stores/order";
import { useApi } from "~/composables/useApi";
import { useUserStore } from "~/stores/user";

const orderStore = useOrderStore();
const { apiPost } = useApi();
const userStore = useUserStore();
const isOrgStaff = ref(false);
const route = useRoute();
const location = route.params.location;
const emit = defineEmits(["availability-toggled"]);


// Permission check
watchEffect(() => {
   if (!userStore.permissions || !userStore.permissions.orgCode) {
      isOrgStaff.value = false;
   } else if(userStore.permissions.orgCode !== location) {
      isOrgStaff.value = false;
   } else {
      isOrgStaff.value = true;
   }
});


const amount = ref(1);
const isVisible = ref(false);
const isTogglingAvailability = ref(false);

const itemAlreadyInOrder = computed(() =>
   orderStore.items.some((item) => item.id === orderStore.selectedItem?.id),
);
const originalAmount = computed(
   () =>
      orderStore.items.find((item) => item.id === orderStore.selectedItem?.id)
         ?.amount,
);

function increaseAmount() {
   amount.value++;
}

function decreaseAmount() {
   if (amount.value > 0) amount.value--;
}

watch(
   () => orderStore.selectedItem,
   (value) => {
      if (value) isVisible.value = true;
   },
);

watch(
   () => orderStore.selectedItem,
   () => {
      if (itemAlreadyInOrder.value) amount.value = originalAmount.value;
      else amount.value = 1;
   },
);

function handleButtonClick() {
   if (amount.value === 0 && itemAlreadyInOrder.value) removeFromOrder();
   else addToOrder();
}

function addToOrder() {
   if (amount.value === 0) {
      isVisible.value = false;
      return;
   }
   if (itemAlreadyInOrder.value)
      orderStore.updateItem(orderStore.selectedItem.id, amount.value); // Update item in the order
   else
      orderStore.addItem({ ...orderStore.selectedItem, amount: amount.value }); // Add item to the order
   isVisible.value = false;
}

function removeFromOrder() {
   if (orderStore.selectedItem)
      orderStore.removeItem(orderStore.selectedItem.id); // Remove item from the order

   isVisible.value = false;
}

async function toggleAvailability() {
   if (!orderStore.selectedItem) return;
   isTogglingAvailability.value = true;
   try {
      const res = await apiPost(`items/${orderStore.selectedItem.id}/toggle-availability`, null);
      if (res && res.unauthorized) {
         // Optionally notify user, but keep UI simple
         return;
      }
      // If success, update local selectedItem availability if response provided
      if (res && typeof res.available !== 'undefined') {
         orderStore.setSelectedItem({ ...orderStore.selectedItem, available: res.available });
      } else if (orderStore.selectedItem) {
         // Toggle locally if API didn't return the new state
         orderStore.setSelectedItem({ ...orderStore.selectedItem, available: !orderStore.selectedItem.available });
      }

      // Ensure the UI picks up the canonical item from the store (in case the store updated its items list)
      await nextTick();
      refreshSelectedItemFromStore();

      // Notify parent(s) so menus or lists can update the displayed availability
      if (orderStore.selectedItem) {
         emit('availability-toggled', { id: orderStore.selectedItem.id, available: orderStore.selectedItem.available });
      }
   } finally {
      isTogglingAvailability.value = false;
   }
}

function refreshSelectedItemFromStore() {
   if (!orderStore.selectedItem) return;
   const fresh = orderStore.items.find((i) => i.id === orderStore.selectedItem.id);
   if (fresh) {
      orderStore.setSelectedItem({ ...fresh });
   }
}

function getButtonLabel() {
   const current = amount.value;
   if (itemAlreadyInOrder.value && current === 0)
      return "Verwijderen uit bestelling";
   else if (itemAlreadyInOrder.value && current === originalAmount.value)
      return "Terug";
   else if (!itemAlreadyInOrder.value && current === 0) return "Annuleren";
   else if (current > 0 && itemAlreadyInOrder.value)
      return "Bestelling bijwerken";
   else return "Toevoegen aan bestelling";
}
</script>

<template>
   <Drawer v-model:visible="isVisible" position="bottom" :style="{ height: 'auto' }">
      <div class="mx-auto flex flex-col items-center justify-between " style="max-height:80vh; overflow-y:auto;">
         <div class="flex w-full items-center justify-between gap-10 pb-6">
            <div>
               <h3 class="text-lg font-bold">
                  {{ orderStore.selectedItem?.name }}
               </h3>
               <p class="text-sm text-gray-500">
                  {{ orderStore.selectedItem?.description }}
               </p>
            </div>
            <div class="flex items-center">
               <button
                  class="cursor-pointer rounded bg-blue-500 px-2 py-1 md:px-3 md:py-2 text-white transition-colors duration-500 hover:bg-blue-600"
                  @click="decreaseAmount"
               >
                  <i class="fas fa-minus text-sm" />
               </button>
               <span class="mx-3 text-xl">{{ amount }}</span>
               <button
                  class="cursor-pointer rounded bg-blue-500 px-2 py-1 md:px-3 md:py-2 text-white transition-colors duration-500 hover:bg-blue-600"
                  @click="increaseAmount"
               >
                  <i class="fas fa-plus text-sm" />
               </button>
            </div>
         </div>

         <div class="w-full mb-3">
            <button
               v-if="isOrgStaff"
               class="w-full cursor-pointer px-3 py-2 transition-colors duration-300 rounded border"
               :class="orderStore.selectedItem?.available ? 'border-red-500 text-red-500 hover:bg-red-500 hover:text-white' : 'border-green-600 text-green-600 hover:bg-green-600 hover:text-white'"
               :disabled="isTogglingAvailability"
               :aria-busy="isTogglingAvailability"
               @click.prevent="toggleAvailability"
            >
               <span v-if="isTogglingAvailability" class="flex items-center justify-center gap-2 ">
                  <span class="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" aria-hidden="true"></span>
                  Bijwerken...
               </span>
               <span v-else>
                  {{ orderStore.selectedItem?.available ? 'Markeer als niet beschikbaar' : 'Markeer als beschikbaar' }}
               </span>
            </button>
         </div>

         <button
            class="w-full cursor-pointer px-3 py-3 text-white transition-colors duration-500 rounded"
            :class="amount > 0
               ? 'bg-blue-500 hover:bg-blue-600'
               : 'bg-red-500 hover:bg-red-600'
               "
            @click="handleButtonClick"
         >
            {{ getButtonLabel() }}
         </button>
      </div>
   </Drawer>
</template>
