<template>
  <div class="flex items-center gap-4 text-sm">
    <div 
      v-for="status in orderStatuses" 
      :key="status.key"
      class="flex items-center gap-2"
    >
      <span 
        class="h-4 w-4 rounded-sm" 
        :class="status.color" 
      />
      <span class="font-semibold text-gray-700">
        {{ status.label }}
      </span>
    </div>
  </div>
</template>

<script setup>
const orderStatuses = [
  { key: 'new', color: 'bg-blue-500', label: 'Nieuw' },
  { key: 'pending', color: 'bg-orange-500', label: 'In behandeling' },
  { key: 'fulfilled', color: 'bg-green-500', label: 'Afgerond' }
]
</script>