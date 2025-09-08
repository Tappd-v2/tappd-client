<template>
  <div
    class="card-hover mb-4 overflow-hidden rounded-lg text-white flex items-center justify-between p-4 cursor-pointer"
    :class="[getOrderStatusClass(request.state, 'base'), { 'bounce-new-order': request.isNewFromWs }]"
    @click="$emit('toggle-state', request)"
  >
    <div class="flex items-center gap-4">
      <div class="text-lg font-bold">
        {{ request.table ? request.table.name : ('Tafel ' + request.tableId) }}
      </div>
      <div v-if="request.customerName" class="text-lg">
        - {{ request.customerName }}
      </div>
    </div>

    <div class="text-2xl">
      <i :class="request.state === 'pending' ? 'fas fa-bell' : 'fas fa-bell-slash '" />
    </div>
  </div>
</template>

<script setup>
import { getOrderStatusClass } from '~/utils/orderHelpers'

defineProps({
  request: {
    type: Object,
    required: true
  }
})

defineEmits(['toggle-state'])
</script>

<style scoped>
.card-hover {
    transition: transform 0.2s ease;
}

.card-hover:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.pulse-icon {
    animation: pulse 1.5s infinite;
}

@keyframes pulse {
    0% {
        transform: scale(1);
    }

    50% {
        transform: scale(1.1);
    }

    100% {
        transform: scale(1);
    }
}
</style>