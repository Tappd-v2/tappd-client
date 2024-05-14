<script setup>
useHead({
  title: 'Home',
  meta: [
    {
      name: 'description',
      content: 'Tappd is an online ordering service for restaurants, bars, and cafes.',
    },
  ],
  titleTemplate: 'Tappd - %s',
})
</script>

<template>
  <div
    class="flex flex-col bg-gray-100"
  >
    <MainMenu />
  </div>
</template>
