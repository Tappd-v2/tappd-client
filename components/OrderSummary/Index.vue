<script setup>
import { onMounted, ref, watchEffect, computed, watch } from "vue";
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

const emit = defineEmits(["checkout-error"]);

const { apiPost } = useApi();
const $router = useRouter();
const orderStore = useOrderStore();
const userStore = useUserStore();
const config = useRuntimeConfig();
const stripe = ref(null);
const orderDetailsVisible = ref(false);
const checkoutError = ref(null);
const route = useRoute();

// track previous item count so we can clear error when user removes an item
const prevItemCount = ref(orderStore.items.length);
watch(
  () => orderStore.items.length,
  (newCount) => {
    if (newCount < prevItemCount.value) {
      checkoutError.value = null;
      emit('checkout-error', null);
    }
    prevItemCount.value = newCount;
  }
);

// ensure we display the total with exactly 2 decimals
const formattedTotal = computed(() => {
   // itemTotal is already rounded in the store, ensure it's shown with 2 decimal places
   return Number(orderStore.itemTotal).toFixed(2);
});

watchEffect(() => orderStore.items);
watchEffect(() => orderStore.table);

onMounted(async () => {
   stripe.value = await loadStripe(config.public.stripePublishableKey);
});

async function handleCheckoutButtonClick() {
   if (props.finalStep) await createCheckoutSession();
   else $router.push(`/venues/${route.params.location}/checkout`);
}

async function createCheckoutSession() {
   try {
      // clear any existing error and notify parent that error was cleared
      checkoutError.value = null;
      emit('checkout-error', null);

      const data = {
         items: orderStore.items.map((item) => ({
            id: item.id,
            name: item.name,
            // ensure price is a number rounded to 2 decimals
            price: Number(Number(item.price).toFixed(2)),
            quantity: item.amount,
         })),
         tableId: orderStore.table.id,
         tableName: orderStore.table.name,
         remarks: orderStore.remarks,
         userId: userStore.user ? userStore.user.id : null,
         locationId: route.params.location,
      };
      const response = await apiPost("checkout", data, route.params.location);
      if(response?.error) {
         throw response.error;
      }
      const sessionId = response.id;
      await stripe.value.redirectToCheckout({ sessionId });
   } catch (error) {
      console.error("Checkout error:", error);
      checkoutError.value = error;
      // notify parent page
      emit('checkout-error', error);
   }
}

function toggleOrderDetails() {
   orderDetailsVisible.value = !orderDetailsVisible.value;
}

const isBtnDisabled = computed(() => {
   return (props.finalStep && orderStore.table === null) || Boolean(checkoutError.value);
});
</script>

<template>
   <div
      class="fixed bottom-0 w-full border-t border-gray-200 bg-white shadow-lg"
   >
      <button
         class="w-full cursor-pointer pt-4 text-center text-lg font-bold"
         @click="toggleOrderDetails"
      >
         <i
            :class="orderDetailsVisible ? 'fa fa-chevron-down' : 'fa fa-chevron-up'
               "
            aria-hidden="true"
         />
      </button>

      <div class="mx-auto flex items-center justify-between p-4 pt-0">

         <div>
            <p class="text-left text-sm text-gray-500">
               Aantal items: {{ orderStore.itemCount }}
            </p>
            <p class="text-lg font-bold">
               Totaalprijs: &#8364;{{ formattedTotal }}
            </p>
         </div>
         <div class="flex flex-col items-end w-1/2">
            <Button
               :disabled="isBtnDisabled"
               class="rounded-lg bg-blue-500 px-4 py-2 text-white disabled:opacity-60"
               @click="handleCheckoutButtonClick"
            >
               {{ props.finalStep ? "Afrekenen" : "Bestellen" }}
            </Button>
         </div>
      </div>

      <OrderSummaryDetails :show-details="orderDetailsVisible" />
   </div>
</template>

<style scoped>
.order-details {
   transition: all 0.3s;
}
</style>
