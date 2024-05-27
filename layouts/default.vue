<script setup>
import { useUserStore } from '~/stores/user'

const userStore = useUserStore()
const credentials = {
  email: 'user@example.com',
  password: 'example',
}
userStore.login(credentials)
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
