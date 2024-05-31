<script setup>
import { useOrderStore } from '~/stores/order'

const orderStore = useOrderStore()
const location = ref('')
const route = useRoute()

watch(
  () => orderStore.location,
  async (location) => {
    if (!location)
      return
    location.value = location.name
  },
)

useHead({
  title: 'Welcome',
})
</script>

<template>
  <section class="w-9/12 mx-auto">
    <MainTitle :title="location" />

    <div class="flex flex-col justify-center items-center w-full mt-32 gap-10">
      <NuxtLink
        :to="`/venues/${route.params.location}/menu`"
        class="bg-blue-500 w-full text-center py-5 px-5 rounded text-white  block"
      >
        Bestel Online
      </NuxtLink>
      <div class="w-full flex gap-5 justify-center items-center">
        <span class="divider" />
        <p class="font-bold text-gray-400">
          of
        </p>
        <span class="divider" />
      </div>
      <NuxtLink
        :to="`/venues/${route.params.location}/call`"
        class="bg-gray-200 w-full text-center py-5 px-5 rounded  block"
      >
        Roep personeel
      </NuxtLink>
    </div>
  </section>
</template>

<style scoped>
.divider {
  display: block;
  width: 100%;
  height: 1px;
  background-color: #bebebe;
  margin: 1rem 0;
}
</style>
