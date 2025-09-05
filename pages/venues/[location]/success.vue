<script setup>
import { useOrderStore } from "~/stores/order";

const orderStore = useOrderStore();

orderStore.clear();

useHead({
   title: "Bestelling Succesvol | Tappd - Eenvoudig Bestellen",
});
</script>

<template>
   <PaymentStatus :cancelled="false" />
</template>
