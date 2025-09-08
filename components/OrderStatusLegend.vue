<template>
  <div class="flex flex-col ">
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
    <div class="mx-auto mt-3  text-sm text-gray-600">
            Tik op een bestelling om deze naar de volgende status te zetten.
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