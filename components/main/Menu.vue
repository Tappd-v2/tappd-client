<script setup>
import { useOrderStore } from "~/stores/order";

const orderStore = useOrderStore();

defineProps({
   menu: {
      type: Array,
      required: true,
   },
});

function selectItem(item) {
   orderStore.unsetSelectedItem();
   // Use nextTick to ensure the DOM updates before setting the new item
   nextTick(() => {
      orderStore.setSelectedItem(item);
   });
}
</script>

<template>
   <section>
      <div
         v-for="category in menu"
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
               @click="selectItem(items)"
            >
               <li
                  class="py-5 hover:cursor-pointer hover:font-medium"
                  :class="{
                     'border-b border-gray-300':
                        items.id !=
                        category.items[category.items.length - 1].id,
                  }"
               >
                  <div class="flex justify-between">
                     <span>{{ items.name }}</span>
                     <span>&#8364;{{ items.price }}</span>
                  </div>
               </li>
            </ul>
         </div>
      </div>

      <MainItemDetail />
   </section>
</template>
