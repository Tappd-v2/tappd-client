<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useUserStore } from "~/stores/user";

const props = defineProps({
   cancelled: Boolean,
});

const { apiGet } = useApi();
const route = useRoute();
const orderDetails = ref("...");

onMounted(async () => {
   if (!props.cancelled) await getOrderDetails();
});

async function getOrderDetails() {
   try {
      const res = await apiGet(`orders/${route.query.session_id}`);
      orderDetails.value = res;
   } catch (error) {
      console.error("Error fetching customer name:", error); //TODO: Remove in production
   }
}

const userStore = useUserStore();
</script>

<template>
   <div
      class="page-height mx-auto flex w-11/12 flex-col items-center justify-center"
   >
      <i
         v-motion-pop-visible
         class="text-7xl"
         :class="
            cancelled
               ? 'fas fa-times text-red-500'
               : 'fas fa-check text-green-500'
         "
      />
      <h1 class="mt-4 text-center text-2xl font-bold">
         {{
            cancelled
               ? "Bestelling geannuleerd"
               : `Bedankt voor uw bestelling ${userStore.user ? userStore.user.name : ""}`
         }}
      </h1>
      <p class="text-center text-gray-500">
         {{
            cancelled
               ? "Uw bestelling is geannuleerd. Indien dit een fout is, neem dan contact op met het personeel."
               : "Uw bestelling is geplaatst."
         }}
      </p>
      <div class="mt-20 w-full">
         <a
            :href="
               cancelled
                  ? `/venues/${route.params.location}/call-staff`
                  : orderDetails.receiptUrl
            "
            :target="cancelled ? '_self' : '_blank'"
            class="block rounded-lg bg-gray-300 px-4 py-2 text-center"
         >
            {{ cancelled ? "Neem contact op" : "Ontvangsbewijs bekijken" }}
         </a>

         <router-link
            :to="`/venues/${route.params.location}/menu`"
            class="mt-4 block rounded-lg bg-blue-500 px-4 py-2 text-center text-white"
         >
            Terug naar menu
         </router-link>
      </div>
   </div>
</template>

<style scoped>
.page-height {
   height: calc(100vh - 20rem);
}
</style>
