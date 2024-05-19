<script setup>
defineProps({
  cancelled: Boolean,
})
</script>

<template>
  <div class="flex flex-col items-center justify-center page-height">
    <i
      v-motion-pop-visible
      class=" text-7xl"
      :class="cancelled ? 'text-red-500 fas fa-times' : 'text-green-500 fas fa-check'"
    />
    <h1 class="text-2xl font-bold mt-4">
      {{ cancelled ? 'Bestelling geannuleerd' : 'Bestelling geplaatst' }}
    </h1>
    <p
      class="text-gray-500 text-center"
    >
      {{ cancelled ? 'Uw bestelling is geannuleerd. Indien dit een fout is, neem dan contact op met het personeel.' : `Uw bestelling #${$route.query.order_id} is geplaatst.` }}
    </p>
    <div class="mt-20">
      <router-link
        to="/"
        class="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4"
      >
        Terug naar menu
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.page-height {
  height: calc(100vh - 30rem);
}
</style>
