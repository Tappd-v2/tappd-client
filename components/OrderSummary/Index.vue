<script setup>
import { onMounted, ref } from "vue";
import { loadStripe } from "@stripe/stripe-js";
import { useOrderStore } from "~/stores/order";
import { useUserStore } from "~/stores/user";
import { useApi } from "~/composables/useApi";

const props = defineProps({
   finalStep: {
      type: Boolean,
      default: false,
   },
});

const { apiPost } = useApi();
const $router = useRouter();
const orderStore = useOrderStore();
const userStore = useUserStore();
const config = useRuntimeConfig();
const stripe = ref(null);
const orderDetailsVisible = ref(false);

watchEffect(() => orderStore.items);
watchEffect(() => orderStore.table);

onMounted(async () => {
   stripe.value = await loadStripe(config.public.stripePublishableKey);
});

async function handleCheckoutButtonClick() {
   if (props.finalStep) await createCheckoutSession();
   else $router.push(`/venues/${orderStore.location.id}/checkout`);
}

async function createCheckoutSession() {
   try {
      const data = {
         items: orderStore.items.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.amount,
         })),
         tableId: orderStore.table.id,
         remarks: orderStore.remarks,
         userId: userStore.user.id,
         location: orderStore.location.id,
      };
      const response = await apiPost("checkout", data, orderStore.location.id);
      const sessionId = response.id;
      const result = await stripe.value.redirectToCheckout({ sessionId });
      if (result.error) console.error(result.error.message);
   } catch (error) {
      console.error("Error:", error);
   }
}

function toggleOrderDetails() {
   orderDetailsVisible.value = !orderDetailsVisible.value;
}

const isBtnDisabled = computed(() => {
   return (props.finalStep && orderStore.table === null)      
});
</script>

<template>
   <div
      class="fixed bottom-0 w-full border-t border-gray-200 bg-white shadow-lg"
   >
      <button
         class="w-full pt-4 text-center text-lg font-bold"
         @click="toggleOrderDetails"
      >
         <i
            :class="
               orderDetailsVisible ? 'fa fa-chevron-down' : 'fa fa-chevron-up'
            "
            aria-hidden="true"
         />
      </button>

      <div class="mx-auto flex items-center justify-between p-4 pt-0">
         <div>
            <p class="text-left text-sm text-gray-500">
               Total items: {{ orderStore.itemCount }}
            </p>
            <p class="text-lg font-bold">
               Total price: &#8364;{{ orderStore.itemTotal }}
            </p>
         </div>
         <Button
            :disabled="isBtnDisabled"
            class="rounded-lg bg-blue-500 px-4 py-2 text-white"
            @click="handleCheckoutButtonClick"
         >
            {{ props.finalStep ? "Afrekenen" : "Bestellen" }}
         </Button>
      </div>

      <OrderSummaryDetails :show-details="orderDetailsVisible" />
   </div>
</template>

<style scoped>
.order-details {
   transition: all 0.3s;
}
</style>
