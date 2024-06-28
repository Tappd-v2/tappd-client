<script setup>
import { useMenu } from "~/composables/useMenu";
import { useOrderStore } from "~/stores/order";
import { useApi } from "~/composables/useApi";

const route = useRoute();
const { fetchData, menu, filterItems } = useMenu();
const { getLocationName } = useApi();
const orderStore = useOrderStore();
const userStore = useUserStore();
const isLoading = ref(true);
const pageTitle = ref("Menu");
const isStaff = route.params.location === userStore.permissions?.orgCode;

watch(async () => {
   await fetchData(route.params.location);
   pageTitle.value = `${await getLocationName(route.params.location)} - Menu`;
   isLoading.value = false;
});

useHead({
   title: pageTitle,
});
</script>

<template>
   <div>
      <div
         v-if="isLoading"
         class="loadingContainer flex w-full items-center justify-center"
      >
         <ProgressSpinner
            style="width: 50px; height: 50px"
            stroke-width="8"
            fill="var(--surface-ground)"
            animation-duration=".5s"
            aria-label="Custom ProgressSpinner"
         />
      </div>

      <div v-else>
         <StaffNavigation v-if="isStaff" />
         <MainSearch :filter-items="filterItems" />
         <MainCategories :menu="menu" />
         <MainMenu :menu="menu" :store="orderStore" />
         <OrderSummary v-if="orderStore.items.length > 0" :final-step="false" />
         <MainNoResults v-if="!menu.length" />
      </div>
   </div>
</template>

<style scoped>
.loadingContainer {
   height: calc(100vh - 30rem); /* 30rem is the height of the hero */
}
</style>
