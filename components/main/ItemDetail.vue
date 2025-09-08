<script setup>
import { ref, watch, computed } from "vue";

import { useOrderStore } from "~/stores/order";

const orderStore = useOrderStore();

const amount = ref(1);
const isVisible = ref(false);

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

         <button
            class="w-full cursor-pointer px-3 py-3 text-white transition-colors duration-500 rounded"
            :class="
               amount > 0
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
