<script setup>
import { useRoute } from "vue-router";
import { ref } from "vue";
import { useApi } from "~/composables/useApi";
import { useOrderStore } from "~/stores/order";

const route = useRoute();
const orderStore = useOrderStore();
const { apiPost } = useApi();
const visible = ref(false);
const popupMessage = ref("");

async function callStaff() {
   visible.value = true;
   const response = await apiPost(
      `tables/call`,
      { tableId: orderStore.table.id },
      route.params.location,
   )
   if (response.callRequest) { // The api returns a callRequest object if it exists, meaning the staff has already been called
      popupMessage.value = "Het personeel heeft al een oproep van u ontvangen. Ze zullen zo snel mogelijk bij u zijn.";
   } else {
      popupMessage.value = "Bedankt voor het roepen van het personeel. Ze zullen zo snel mogelijk bij u zijn.";
   }
}
</script>

<template>
   <section class="call-staff mx-auto w-9/12">
      <Dialog
         v-model:visible="visible"
         modal
         header="Personeel roepen"
         :style="{ width: '80vw' }"
      >
         <p class="mt-2">
            {{ popupMessage }}
         </p>
      </Dialog>
      <MainTitle title="Personeel Roepen" />

      <div class="my-10 flex h-full flex-col justify-between">
         <div>
            <FormTablePicker />
         </div>
         <div>
            <NuxtLink
               :to="`/venues/${route.params.location}/menu`"
               class="block rounded bg-gray-200 px-5 py-2 text-center"
            >
               Terug naar menu
            </NuxtLink>
            <Button
               class="mt-5 w-full bg-blue-500 py-5 text-white flex justify-center items-center"
               @click="callStaff"
            >
               <i class="fas fa-bell mr-4" /> Personeel roepen
            </Button>
         </div>
      </div>
   </section>
</template>

<style scoped>
.call-staff {
   height: calc(95vh - 20rem);
}
</style>
