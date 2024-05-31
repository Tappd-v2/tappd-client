<script setup>
import { useUserStore } from '~/stores/user'
import { useApi } from '~/composables/useApi'
import { useOrderStore } from '~/stores/order'

const { apiGet } = useApi()
const route = useRoute()
const userStore = useUserStore()
const orderStore = useOrderStore()
const credentials = {
  email: 'user@example.com',
  password: 'example',
}

userStore.login(credentials)

onMounted(async () => {
  getLocation(route.params.location)
})

watch(() => route.params.location, async (location) => {
  getLocation(location)
})

async function getLocation(location) {
  if (location) {
    const location = await apiGet(`locations/${location}`)
    if (!location)
      await navigateTo('/404')

    orderStore.setLocation(location)
  }
}
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <header>
      <MainHeader />
    </header>
    <main class="bg-gray-100 flex-1">
      <slot />
    </main>
  </div>
</template>
