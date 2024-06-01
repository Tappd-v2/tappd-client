<script setup>
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import { useApi } from '~/composables/useApi'
import { useOrderStore } from '~/stores/order'

const route = useRoute()
const orderStore = useOrderStore()
const { apiPost, apiGet } = useApi()
const visible = ref(false)
const btnDisabled = ref(false)

async function callStaff() {
  visible.value = true
  const response = await apiPost('tables/call', { tableId: orderStore.table.id }, orderStore.location.id)
  if (response.status === 200)
    btnDisabled.value = true
}

onMounted(async () => {
  const staffCalled = await apiGet(`tables/${orderStore.table.id}`, orderStore.location.id)
  if (staffCalled)
    btnDisabled.value = true
})
</script>

<template>
  <section class=" w-9/12 mx-auto call-staff">
    <Dialog v-model:visible="visible" modal header="Personeel roepen" :style="{ width: '80vw' }">
      <p class="mt-2">
        Bedankt voor het roepen van het personeel. Ze zullen zo snel mogelijk bij u zijn.
      </p>
    </Dialog>
    <MainTitle title="Personeel Roepen" />

    <div class="flex flex-col justify-between h-full my-10">
      <div>
        <FormTablePicker />
      </div>
      <div>
        <NuxtLink
          :to="`/venues/${route.params.location}/menu`"
          class="bg-gray-200 text-center py-2 px-5 rounded  block"
        >
          Terug naar menu
        </NuxtLink>
        <Button class="bg-blue-500 text-white w-full mt-5 py-5" :disabled="btnDisabled" @click="callStaff">
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
