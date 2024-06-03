<script setup>
import { useOrderStore } from "~/stores/order";

const orderStore = useOrderStore();

const locationName = ref("");

onMounted(() => {
   locationName.value = orderStore.location
      ? orderStore.location.name
      : "Locatie niet gevonden";
});

watch(
   () => orderStore.location,
   () => {
      locationName.value = orderStore.location
         ? orderStore.location.name
         : "Locatie niet gevonden";
   },
);
</script>

<template>
   <div class="hero">
      <div class="text-center">
         <h1 class="text-center text-5xl">Tappd - {{ locationName }}</h1>
         <p class="text-xl">Because you deserve a drink</p>
      </div>
   </div>
</template>

<style scoped>
.hero {
   background-image: url("~/assets/images/hero.png");
   background-position: center;
   background-size: cover;
   color: white;
   padding: 3rem;
   font-family: "Staatliches", cursive;
}
</style>
