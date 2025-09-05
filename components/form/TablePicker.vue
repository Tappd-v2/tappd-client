<script setup>
import { useApi } from "~/composables/useApi";
import { useOrderStore } from "~/stores/order";

const orderStore = useOrderStore();
const route = useRoute();
const { apiGet } = useApi();
const tables = ref([]);

onMounted(() => {
   getTables();
});

async function getTables() {
   try {
      tables.value = await apiGet("tables", route.params.location);
   } catch (error) {
      console.error(error);
   }
}
</script>

<template>
   <Select
      v-model="orderStore.table"
      input-id="dd-table"
      :options="tables"
      option-label="name"
      class="w-full text-black"
      placeholder="Kies een tafel"
   />
</template>
