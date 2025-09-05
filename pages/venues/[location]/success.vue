<script setup>
import { useOrderStore } from "~/stores/order";

const orderStore = useOrderStore();

orderStore.clear();
</script>

<template>
   <PaymentStatus :cancelled="false" />
</template>
