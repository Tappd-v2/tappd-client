<script setup>
import { ref, nextTick, watchEffect, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useOrderStore } from "~/stores/order";
import { useUserStore } from "~/stores/user";

const orderStore = useOrderStore();

const props = defineProps({
   menu: {
      type: Array,
      required: true,
   },
});

// Local reactive copy of menu so we can update availability locally
const localMenu = ref(JSON.parse(JSON.stringify(props.menu || [])));

// Keep localMenu in sync when prop changes
watch(
   () => props.menu,
   (newVal) => {
      localMenu.value = JSON.parse(JSON.stringify(newVal || []));
   },
   { deep: true }
);

function selectItem(item) {
   orderStore.unsetSelectedItem();
   // Use nextTick to ensure the DOM updates before setting the new item
   nextTick(() => {
      orderStore.setSelectedItem(item);
   });
}

const userStore = useUserStore();
const isOrgStaff = ref(false);
const route = useRoute();
const location = route.params.location;

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

// Disable logic for non-staff users: consider items with `available === false` or `unavailable === true` as disabled
function isItemDisabled(item) {
   return (
      !isOrgStaff.value && (item.available === false || item.unavailable === true)
   );
}

function onItemClick(item) {
   if (isItemDisabled(item)) return;
   selectItem(item);
}

// Handle availability toggled events from ItemDetail
function onAvailabilityToggled(payload) {
   if (!payload || !payload.id) return;
   for (const category of localMenu.value) {
      const idx = category.items.findIndex((it) => it.id === payload.id);
      if (idx !== -1) {
         // Update availability
         category.items[idx].available = payload.available;
         break;
      }
   }
}
</script>

<template>
   <section>
      <div
         v-for="category in localMenu"
         :id="formatName(category.name)"
         :key="category.id"
      >
         <div
            v-if="category.items.length > 0"
            class="text-md mx-auto flex w-11/12 flex-col pt-5 pb-10"
         >
            <h3 class="mb-5 text-2xl font-bold">
               {{ category.name }}
            </h3>

            <ul
               v-for="items in category.items"
               :key="items.id"
               @click="onItemClick(items)"
            >
               <li
                  class="py-5  "
                  :class="{
                     'border-b border-gray-300': items.id != category.items[category.items.length - 1].id,
                     'opacity-50 cursor-not-allowed': isItemDisabled(items),
                     'cursor-pointer hover:font-medium': !isItemDisabled(items),
                  }"
                  :aria-disabled="isItemDisabled(items)"
               >
                  <div class="flex justify-between" :class="{ 'text-red-500': !items.available }">
                     <span>{{ items.name }} <span v-if="!items.available"> (Niet beschikbaar)</span></span>
                     <span>&#8364;{{ items.price }}</span>
                  </div>
               </li>
            </ul>
         </div>
      </div>

      <MainItemDetail @availability-toggled="onAvailabilityToggled" />
   </section>
</template>
